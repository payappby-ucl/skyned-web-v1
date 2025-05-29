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

```bash
cd apps/backend/functions
pnpm run start:emulators
```

Once the above command starts running, open another terminal

```bash
cd apps/backend/functions
pnpm run start:test:server
```

Open another terminal tab

```bash
cd apps/admin
pnpm run dev
```
