//connect to database and schema
import connectToDatabase from "./db";
import cards from "./models/cards";
import decks from "./models/decks";
import users from "./models/users";


function getModel(m) {
  if (m === "users") return users;
  else if (m === "deck") return decks;
  else if (m === "cards") return cards;
}

export function handler(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log("connect function", connectToDatabase);
  console.log("event body", JSON.parse(event.body));

  connectToDatabase()
    .then(() => {

      let model = getModel(JSON.parse(event.body).model);

      console.log('what is it????? ', typeof model);

      const newRecord = model(JSON.parse(event.body));
      const doc = newRecord.save();
      const response = {
        statusCode: 200,
        body: JSON.stringify(doc)
      };
      return response;
    })
    .then(res => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ message: "message saved" })
      });
    })
    .catch(err => console.error(err));
}
