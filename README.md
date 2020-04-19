# Team Pesto: Code Peer Review

## Client

To start the development server for the front-end, run:

    npm start

## Server

### Setting up MongoDB

This app requires a connection to a MongoDB service. Follow the [instructions](https://docs.mongodb.com/manual/installation/) on MongoDB's official documentation specific to your system to install MongoDB locally.

Make sure you can successfully start the MongoDB service and that port 27017 is available on your machine. Check by running the following in the terminal:

    mongod --port 27017

To start the app in development mode:

    // starts the MongoDB service in the background before
    // starting the Express app
    npm run dev

To stop the MongoDB service:

    npm run stop-mongo

The MongoDB service should be stopped before running the `dev` script again. Otherwise, to only start the Express app, use

    npm run server-dev

## Redis

This app also requires a connection to a Redis database. Follow the [instructions](https://redis.io/download) on Redis's official website to download and install Redis locally.

## Formatting with Prettier and Linting with ESLint

While in the client or server directories, run the `lint` script to format code with Prettier and lint with ESLint (AirBnB preset). Run with the silence flag, `-s`, to suppress npm errors.

    npm run lint -s

To skip automatically applying fixes, run

    // client
    npx eslint src

    // server
    npx eslint .
