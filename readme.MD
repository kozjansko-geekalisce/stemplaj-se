# Štémplaj se

Mobile app for encouragement of local activity

## Dev environment setup

Make sure you have a recent version of Node installed locally.

```bash
# Start dev container with the database in the background
docker-compose up -d

# Install npm dependencies
yarn

# Run migrations and insert seed data
npx prisma migrate reset

# Start dev environment
yarn dev

# Format all TS files
yarn format
```

## Useful links

- [Prisma documentation](https://www.prisma.io/) - our ORM
- [Express documentation](https://expressjs.com/) - our framework
- [REST API Example](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-express) - Sample app that uses Express.js as the framework and Prisma as the ORM
