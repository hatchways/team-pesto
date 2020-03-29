# RFP: Peer Code Review

### Formatting with Prettier and Linting with ESLint

While in the client or server directories, run the `lint` script to format code with Prettier and lint with ESLint (AirBnB preset). Run with the silence flag, `-s`, to suppress npm errors.

    npm run lint -s

To skip automatically applying fixes, run

    // client
    npx eslint src

    // server
    npx eslint .
