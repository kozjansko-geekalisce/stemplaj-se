# Štémplaj se

Mobile app for encouragement of local activity

## Dev environment with everything in Docker

```bash
# Start dev container with the database in the background, omit the -d if you
# want to see container terminal output.
docker compose up -d

# Run migrations and insert seed data
docker compose run app yarn seed
```

The app will be visible on `http://localhost:3000/login`

## Dev environment with app running locally

Make sure you have a recent version of Node installed locally.

```bash
# Start dev container with the database in the background
docker compose up postgres -d

# Create .env file
cp .env.example .env

# Install npm dependencies
yarn

# Run migrations and insert seed data
yarn seed

# Start dev environment
yarn dev
```

## Useful links

- [Prisma documentation](https://www.prisma.io/) - our ORM
- [Express documentation](https://expressjs.com/) - our framework
- [REST API Example](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-express) - Sample app that uses Express.js as the framework and Prisma as the ORM
