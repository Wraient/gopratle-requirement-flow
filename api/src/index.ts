import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import requirementsRouter from './routes/requirements';

const PORT = Number(process.env.PORT ?? 4000);
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? '*';

let dbMode: 'connected' | 'memory' = 'connected';

async function connectDb(): Promise<void> {
  const uri = process.env.MONGODB_URI;
  if (uri) {
    await mongoose.connect(uri);
    dbMode = 'connected';
    console.log('MongoDB: connected with MONGODB_URI');
  } else {
    const memoryServer = await MongoMemoryServer.create();
    await mongoose.connect(memoryServer.getUri());
    dbMode = 'memory';
    console.log('MongoDB: MONGODB_URI not set, using in-memory server (data resets on restart)');
  }
}

async function main(): Promise<void> {
  await connectDb();

  const app = express();
  app.use(express.json());
  app.use(cors({ origin: CORS_ORIGIN }));

  app.use((req, _res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
    next();
  });

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, db: dbMode });
  });

  app.use('/api', requirementsRouter);

  app.use((_req, res) => {
    res.status(404).json({ error: 'Not found' });
  });

  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  });

  app.listen(PORT, () => {
    console.log(`GoPratle API listening on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error('Failed to start API', err);
  process.exit(1);
});
