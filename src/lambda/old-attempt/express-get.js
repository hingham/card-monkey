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

  connectAndCreate()
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(res)
      });
    })
    .catch(error => callback(error));
};

function connectAndCreate(_id) {
  let players;

  return co(function*() {
    if (connection == null) {
      connection = yield mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useCreateIndex: true
      });
      players = connection.model("players", schema);
    }

    players = connection.model("players", schema);
    return players.find({});
  });
}
