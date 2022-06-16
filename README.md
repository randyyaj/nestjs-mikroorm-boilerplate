# Nestjs MikroORM boiler plate

- Runs MikroORM migrations programmatically when app runs
- Adds OrmModule for register entities and importing the module for repository acces
- Adds ConfigService for sourcing MikroOrm configuration
- Adds test-mock for easier jest repository mocks
- Adds docker compose file for running postgres container

### Prerequisite

Before running the app, create a .env file with contents:

```
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_DATABASE=test
MIKRO_ORM_MIGRATIONS_PATH=./migrations
```

Nestjs ConfigService will use these configuration to setup the database connection

### Running docker postgres container

```
$ docker compose up -d db
$ docker ps
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```