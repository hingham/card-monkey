import getUserData from "./utils/get-user-data.js";
import oauth2, { config } from "./utils/oauth";
import superagent from "superagent";

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
      client_secret: config.clientSecret,
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
          return {
            model: "users",
            git_id: user.id,
            login: "hingham",
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
      superagent.post(`http://localhost:9000/post`).send(user);
      // Do stuff with user data
      // console.log('user data', result.data)
      // Do other custom stuff
      // return results to browser
      return user;
    })
    .then(result => {
      console.log('result', result)
     
      //return user the homepage
      return callback(null, {
        statusCode: 302,
        headers: {
          Location: `http://localhost:3000?id=${result.git_id}`,
          'Cache-Control': 'no-cache' // Disable caching of this response
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
