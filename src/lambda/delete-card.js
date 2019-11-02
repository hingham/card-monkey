import connectToDatabase from "./db";
import deleteModel from "./models/delete.model";
import cards from "./models/cards";
var ObjectId = require("mongodb").ObjectID;

export function handler(event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false;
    console.log("BODY from event", event.body);

    connectToDatabase()
        .then((db) => {
            console.log("DB", db);
            const parsedBody = JSON.parse(event.body);
            const deletedRecords = cards(parsedBody);
            const { _id } = parsedBody

            const deleted = deletedRecords.remove({ _id: ObjectId(_id) }, (err, result) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                else {
                    console.log(result)
                }
            });
            const response = {
                statusCode: 200,
                body: deleted
            };
            return response;

        })
        .then(() => {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({ message: "card deleted" })
            });
        })
        .catch(err => console.error(err));
}