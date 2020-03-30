# Team Pesto: Code Peer Review

## Client

## Server

### Setting up MongoDB

This app requires a local installation of MongoDB. Follow the [instructions](https://docs.mongodb.com/manual/installation/) on MongoDB's official documentation specific to your system.

Make sure you can successfully start the MongoDB service and that port 27017 is available on your machine. Check by running the following in the terminal:

    mongod --port 27017

To start the app in development mode:

    // starts the MongoDB service in the background before
    // starting the Express app
    npm run dev

To stop the MongoDB service:

    npm run stop-mongo
