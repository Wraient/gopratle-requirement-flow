# GoPratle Requirement API

Express + Mongoose backend for the GoPratle take-home: it validates and stores
multi-step "requirement posting" forms, categorized as `planner`, `performer`
or `crew`. All validation lives in `@gopratle/shared` (zod), which the frontend
also imports, so both sides enforce the same contract.

## Run it

Prereqs: Node 24.

```bash
# 1. Build the shared contracts first (the API imports its dist output)
cd packages/shared
npm install
npm run build

# 2. Install and build the API
cd ../../api
npm install
npm run build

# 3a. Dev: hot reload, in-memory MongoDB, no setup needed
npm run dev

# 3b. Prod: build then start
npm run build
npm start
```

Without `MONGODB_URI` the API spins up `mongodb-memory-server` and logs
`using in-memory server`. Set `MONGODB_URI` in `.env` to persist data.
Copy `.env.example` to `.env` and adjust `PORT` / `CORS_ORIGIN` as needed.

One note on the validation design: in zod v3, `.refine()` returns a
ZodEffects wrapper, which cannot be an option of `z.discriminatedUnion`. So the
cross-field rules (endDate on or after startDate for every category, and
budgetMax >= budgetMin for planner) are applied in
`validatedRequirementSchema`, which wraps the union. The API validates POST
bodies with that schema; the frontend can use the plain `requirementSchema`
union plus the same wrapper.

## Endpoints

### GET /api/health

```bash
curl http://localhost:4000/api/health
# {"ok":true,"db":"memory"}
```

### POST /api/requirements

Validates the body against the shared schema. Returns `400` with
`{ error, details }` on failure, `201` with the saved document on success.

Planner example:

```bash
curl -X POST http://localhost:4000/api/requirements \
  -H 'Content-Type: application/json' \
  -d '{
    "category": "planner",
    "eventName": "Sharma Wedding Sangeet",
    "eventType": "Wedding",
    "startDate": "2026-12-10T10:00:00+05:30",
    "endDate": "2026-12-12T22:00:00+05:30",
    "location": "Jaipur, Rajasthan",
    "venue": "Rambagh Palace",
    "budgetMin": 500000,
    "budgetMax": 1200000,
    "guestCount": 300,
    "servicesNeeded": ["Catering", "Decor & Theming", "Photography"],
    "plannerExperience": "5+ years",
    "plannerNotes": "Royal Rajasthani theme, must include folk performers"
  }'
```

Performer example:

```bash
curl -X POST http://localhost:4000/api/requirements \
  -H 'Content-Type: application/json' \
  -d '{
    "category": "performer",
    "eventName": "TechFest Afterparty",
    "eventType": "Corporate",
    "startDate": "2026-11-20T19:00:00+05:30",
    "endDate": "2026-11-20T23:00:00+05:30",
    "location": "Bengaluru, Karnataka",
    "performanceType": "EDM DJ set",
    "durationMinutes": 120,
    "feeExpected": 150000,
    "portfolioLinks": ["https://youtube.com/watch?v=example"],
    "crewSize": 3
  }'
```

### GET /api/requirements

Newest first. Optional `category` filter (must be `planner`, `performer` or
`crew`); `limit` defaults to 20, max 100. Returns `{ data, count }`.

```bash
curl 'http://localhost:4000/api/requirements?category=planner&limit=10'
```
