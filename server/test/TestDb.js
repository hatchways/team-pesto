const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const mongod = new MongoMemoryServer();

// connect to in-memory database
exports.connect = async () => {
  const uri = await mongod.getUri();

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, options);
};

// drop database, close mongoose connection, stop mongod
exports.close = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.close();
};

// drop database
exports.clear = async () => {
  await mongoose.connection.dropDatabase();
};
