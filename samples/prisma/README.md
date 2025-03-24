# Prisma

```bash
pnpm add prisma
```

## Initialize

```bash
npx prisma init --datasource-provider postgres|sqlite
```

It will generate something like this

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "prisma-client"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## Create Migration

```bash
npx prisma migrate dev --name init
```
