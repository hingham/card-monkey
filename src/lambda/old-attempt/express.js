var co = require("co");
var mongoose = require("mongoose");

let connection = null;

const uri = `mongodb+srv://hingham:mongopples@cluster0-zuiec.mongodb.net/test?retryWrites=new&w=majority`;

let schema = new mongoose.Schema({
  name: String,
  team: String
});

exports.handler = function(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;

  connectAndCreate(JSON.parse(event.body))
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(res)
      });
    })
    .catch(error => callback(error));
};

function connectAndCreate(record) {
  let players;

  return co(function*() {
    if (connection == null) {
      connection = yield mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        bufferCommands: false,
        bufferMaxEntries: 0
      });
      players = connection.model("players", schema);
    }

    // const newRecord = players({name: "hannah", team: "mice"});
    const newRecord = players(record);

    const doc = newRecord.save();
    const response = {
      statusCode: 200,
      body: JSON.stringify(doc)
    };
    return response;
  });
}
