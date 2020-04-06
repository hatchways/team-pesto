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

// clear database collections
exports.clear = async () => {
  /* eslint-disable */
  const { collections } = mongoose.connection;
  for (const k in collections) {
    await collections[k].deleteMany();
  }
  /* eslint-enable */
};
