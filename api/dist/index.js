"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const requirements_1 = __importDefault(require("./routes/requirements"));
const PORT = Number(process.env.PORT ?? 4000);
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? '*';
let dbMode = 'connected';
async function connectDb() {
    const uri = process.env.MONGODB_URI;
    if (uri) {
        await mongoose_1.default.connect(uri);
        dbMode = 'connected';
        console.log('MongoDB: connected with MONGODB_URI');
    }
    else {
        const memoryServer = await mongodb_memory_server_1.MongoMemoryServer.create();
        await mongoose_1.default.connect(memoryServer.getUri());
        dbMode = 'memory';
        console.log('MongoDB: MONGODB_URI not set, using in-memory server (data resets on restart)');
    }
}
async function main() {
    await connectDb();
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)({ origin: CORS_ORIGIN }));
    app.use((req, _res, next) => {
        console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
        next();
    });
    app.get('/api/health', (_req, res) => {
        res.json({ ok: true, db: dbMode });
    });
    app.use('/api', requirements_1.default);
    app.use((_req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
    app.use((err, _req, res, _next) => {
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
