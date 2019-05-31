import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
let isConnected;

const options = {
    useNewUrlParser:true,
    useCreateIndex: true,
  };

export default function () {
  if (isConnected) {
    console.log('=> using existing database connection');
    return Promise.resolve();
  }

  console.log('=> using new database connection');
  return mongoose.connect(`mongodb+srv://hingham:mongopples@cluster0-zuiec.mongodb.net/test?retryWrites=true&w=majority`, options)
    .then(db => { 
      isConnected = db.connections[0].readyState;
    })
    .catch(err => console.error(err));
};

