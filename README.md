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

### Live Environment

<!-- [Entry](https://api-dxmhb5dscq-uc.a.run.app)
[Health Check](https://api-dxmhb5dscq-uc.a.run.app/health)
[API Documentation](https://api-dxmhb5dscq-uc.a.run.app/api-docs)
[Test Coverage](https://api-dxmhb5dscq-uc.a.run.app/coverage) -->

### ENV Files

apps/backend/functions
check .env-sample and create the following

```bash
.env
.env.dev
.env.prod
.env.test
```

### Run test

Ensure you have Docker installed and runing

```bash
pnpm --filter functions start:emulators
pnpm --filter functions test
```

### Deployment

Ensure you have Docker installed and running

```bash
pnpm --filter functions start:emulators
pnpm --filter functions deploy:test
```
