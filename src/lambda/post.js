//connect to database and schema
import connectToDatabase from "./db";
import notes from "./models/note.js";
import cards from "./models/cards.js";
import decks from "./models/decks.js";

// let model;

function getModel(m) {
  if (m === "notes") {
    // model = notes;
    return notes;
  } else if (m === "decks") {
    // model = decks;
    return decks;
  } else if (m === "cards") {
    // model = cards;
    return cards;
  }
}

export function handler(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log("connect function", connectToDatabase);
  console.log("event body", JSON.parse(event.body));

  connectToDatabase()
    .then(() => {
      let model = getModel(JSON.parse(event.body).model);

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
