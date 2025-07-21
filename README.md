# Installation

```bash
pnpm install
```

## Backend

### Dev Environment

[Entry](https://api-dxmhb5dscq-uc.a.run.app)
[Health Check](https://api-dxmhb5dscq-uc.a.run.app/health)
[API Documentation](https://api-dxmhb5dscq-uc.a.run.app/api-docs)
[Test Coverage](https://api-dxmhb5dscq-uc.a.run.app/coverage)
[Code Documentation](https://api-dxmhb5dscq-uc.a.run.app/code-docs)

### ENV Files

apps/backend/functions
check .env-sample and create the following

```bash
.env
.env.dev
.env.prod
.env.test
```

apps/admin

```bash
.env.dev
.env.local
```

apps/frontend

```bash
.env.dev
.env.local
```

### Run Locally

Ensure you have Docker installed and running
create the following files **Note there are example env files on each project**

```bash
cd apps/backend/functions
touch .env
touch .env.test

cd apps/admin
touch .env.dev
touch .env.local

cd apps/frontend
touch .env.dev
touch .env.local
```

## Loacl Development Setup

This section provides instructions for setting up the development environment with three concurrent processes:

Each process should be run in a separate terminal tab to allow concurrent execution of all development services.


1. **Install Dependencies**: Installs all project dependencies using pnpm
```bash
pnpm i
```

2. **Start Firebase Emulators**: Launches local Firebase emulators for backend development and testing
```bash
cd apps/backend/functions && pnpm run start:emulators
```

3. **<span style="color: #ff6b35;">[ ⚠️ Open another terminal tab ]</span> Start Test Server**: Runs the backend test server for API testing
```bash
cd apps/backend/functions && pnpm run start:test:server
```

4. **<span style="color: #ff6b35;">[ ⚠️ Open another terminal tab ]</span> Start Frontend Development Server**: Launches the frontend application in development mode with hot reload
```bash
cd apps/frontend && pnpm run dev
```
