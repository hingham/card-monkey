/* code from /functions/auth.js */
import oauth2, { config } from './utils/oauth'

/* Do initial auth redirect */
exports.handler = (event, context, callback) => {
  /* Generate authorizationURI */
  console.log('auth.js line 7 log, reporting for duty');
  const authorizationURI = oauth2.authorizationCode.authorizeURL({
    redirect_uri: config.redirect_uri,
    /* Specify how your app needs to access the user’s account. http://bit.ly/intercom-scopes */
    scope: 'user',
    /* State helps mitigate CSRF attacks & Restore the previous state of your app */
    state: 'randomstring',
  })

    console.log('auth url', authorizationURI);
    
  /* Redirect user to authorizationURI */
  const response = {
    statusCode: 302,
    headers: {
      Location: authorizationURI,
      'Cache-Control': 'no-cache' // Disable caching of this response
    },
    body: '' // return body for local dev
  }

  return callback(null, response)
}