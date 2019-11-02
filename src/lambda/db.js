let mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
let isConnected;

console.log('password', process.env.MONGO_PASSWORD);

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
};

export default function () {
  if (isConnected) {
    console.log('=> using existing database connection');
    return Promise.resolve();
  }

  console.log('=> using new database connection');
  return mongoose.connect(`mongodb+srv://hingham:${process.env.MONGO_PASSWORD}@cluster0-zuiec.mongodb.net/card-monkey?retryWrites=true&w=majority`, options)
    .then((db) => {
      isConnected = db.connections[0].readyState;
      return db.connections[0].db;
    })
    .catch((err) => console.error(err));
};

