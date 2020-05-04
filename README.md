# Team Pesto: Peer Code Review

A platform where programmers can spend credits to request code reviews from more experienced programmers or review the code of those who are less experienced. Code review requests are asynchronously matched with code reviewers in a Redis-based task queue. Real-time updates and notifications are delivered to users through the use of web sockets.

## Client

To start the development server for the front-end, run:

    npm start

## Server

### MongoDB

This app requires a connection to a MongoDB service. Follow the [instructions](https://docs.mongodb.com/manual/installation/) on MongoDB's official documentation specific to your system to install MongoDB locally.

Make sure you can successfully start the MongoDB service and that port 27017 is available on your machine. Check by running the following in the terminal:

    mongod --port 27017

### Redis

This app also requires a connection to a Redis database. Follow the [instructions](https://redis.io/download) on Redis's official website to download and install Redis locally.

### Development

To start the app in development mode:

    // starts the MongoDB service in the background 
    // then starts the Express app
    npm run dev

To stop the MongoDB service:

    npm run stop-mongo

The MongoDB service should be stopped before running the `dev` script again. Otherwise, to start the Express app only, use:

    npm run server-dev

## Production

A production build is automatically Dockerized and deployed to Heroku when merging to the master branch and after passing some initial checks through CircleCI. To build and run the container locally:

    // in the project root directory
    // with Docker installed
    // replace <tag> with a custom tag for the image
    docker build -t <tag> .

    // spin up a new container with the image
    // replace <container-name> with a custom name for the container
    // include the -d flag to run the container in the background
    docker run --name <container-name> -p 3000:3000 <tag>

## Formatting with Prettier and Linting with ESLint

While in the client or server directories, run the `lint` script to format code with Prettier and lint with ESLint (AirBnB preset). Run with the silence flag, `-s`, to suppress npm errors.

    npm run lint -s

To skip automatically applying fixes, run

    // client
    npx eslint src

    // server
    npx eslint .
