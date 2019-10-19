import request from 'request'
import querystring from 'querystring'
import { config } from './oauth'
import superagent from 'superagent'

/* Call into https://app.intercom.io/me and return user data */
// export default function getUserData(token) {
//   const postData = querystring.stringify({
//     client_id: config.clientId,
//     client_secret: config.clientSecret,
//     app_id: config.appId
//   })

//   const requestOptions = {
//     url: `${config.profilePath}?${postData}`,
//     json: true,
//     auth: {
//       user: token.token.access_token,
//       pass: '',
//     },
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Accept': 'application/json',
//     }
//   }
//   return requestWrapper(requestOptions, token)
// }

// /* promisify request call */
// function requestWrapper(requestOptions, token) {
//   return new Promise((resolve, reject) => {
//     request(requestOptions, (err, response, body) => {
//       if (err) {
//         return reject(err)
//       }
//       // return data
//       return resolve({
//         token: token,
//         data: body,
//       })
//     })
//   })
// }

export default function getUserData(token) {
  let myUser;
  return superagent.get(`https://api.github.com/user?access_token=`)
    .set('Authorization', `Bearer ${token.token.access_token}`)
    .then(res => {
      let user = res.body;
      console.log('user body', user);

      console.log('user', user);
      let userObj = {
        model: "users",
        git_id: user.id | NaN,
        login: "hingham",
        scope: "user"
      }
      superagent.post(`/.netlify/functions/post`)
        .send(userObj);
    })
    .catch(err => console.error(err));

}