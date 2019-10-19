import getUserData from "./utils/get-user-data.js";
import oauth2, { config } from "./utils/oauth";
import superagent from "superagent";
import connectToDatabase from "./db";
import users from "./models/users";

/* Function to handle intercom auth callback */
export function handler(event, context, callback) {
  console.log("in function");
  const code = event.queryStringParameters.code;
  /* state helps mitigate CSRF attacks & Restore the previous state of your app */
  const state = event.queryStringParameters.state;

  /* Take the grant code and exchange for an accessToken */
  oauth2.authorizationCode
    .getToken({
      code: code,
      redirect_uri: config.redirect_uri,
      client_id: config.clientId,
      client_secret: config.clientSecret
    })
    .then(result => {
      const token = oauth2.accessToken.create(result);
      console.log("accessToken", token);
      return token;
    })
    // Get more info about intercom user
    .then(token => {
      // getUserData(token);
      return superagent
        .get(`https://api.github.com/user?access_token=`)
        .set("Authorization", `Bearer ${token.token.access_token}`)
        .then(res => {
          let user = res.body;
          console.log(user);
          return {
            model: "users",
            git_id: user.id | NaN,
            login: user.login,
            scope: "user"
          };
        })
        .catch(err => console.error(err));
    })

    // Do stuff with user data & token
    .then(result => {
      console.log("result", result);
      return result;
    })
    .then(user => {
      //TODO: if there isn't a user in the db, save the user
      return connectToDatabase()
        .then(() => {
          users.find({ git_id: user.git_id }, (err, res) => {
            if (err) console.error(err);
            console.log("res", res);
            if (res.length === 0) {
              console.log('recieved data', user);
              superagent.post(`http://localhost:9000/post`).send(user)
                .then(response => console.log('the stat !!: ', response.status))
                .catch(err => console.error(err))
            }
          });
          return user;
        })
        .catch(err => console.error("err", err));

    })
    .then(result => {
      console.log("result", result);

      //return user the homepage
      return callback(null, {
        statusCode: 302,
        headers: {
          Location: `http://localhost:3000`,
          "Cache-Control": "no-cache", // Disable caching of this response
          "Set-Cookie": `user=${result.git_id}; domain=localhost; expires=Thu, 19 December 2019 20:41:27 GMT;`,
        },

        body: JSON.stringify(result)
      });
    })
    .catch(error => {
      console.log("Access Token Error", error.message);
      console.log(error);
      return callback(null, {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({
          error: error.message
        })
      });
    });
}
