# Spending App

## start

### Database

To start a new mongo db image from docker:
> docker run --name spending-app-db -v $(pwd)/data/db:/data/db -p 27017:27017 -d mongo:4.0

### applications

Run this command to install shared and external packages:
> npm i -g lerna && lerna bootstrap

#### Api

You need define the `DB_HOST` and `USER_PSW_SALT` envs to start the api server.
For do that, maybe you want create a `./apps/api/.env.development.local` file.


## Content

### [Api](./apps/api)

Build top of `NestJS` as `GraphQL` server and `Mongoose`.

### [Mobile](./apps/mobile)

Build top of `React Native`, `Apollo` and `Typescript`.


