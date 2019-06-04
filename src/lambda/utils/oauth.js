import simpleOauth from "simple-oauth2";
import { userInfo } from "os";

// import {} from 'dotenv/config'
import { If } from "../../components/conditionals";

const github = "https://github.com";
/* process.env.URL from netlify BUILD environment variables */
const siteUrl = process.env.URL || "http://localhost:3000";

console.log("id", process.env.GITHUB_CLIENT_ID);

export const config = {
  /* values set in terminal session or in netlify environment variables */
  appId: process.env.GITHUB_APP_ID,
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  /* Intercom oauth API endpoints */
  tokenHost: github,
  authorizePath: `${github}/login/oauth/authorize`,
  tokenPath: `${github}/login/oauth/access_token`,
  profilePath: `${github}/me/`,
  /* redirect_uri is the callback url after successful signin */
  redirect_uri: `http://localhost:9000/auth-callback`
};

function authInstance(credentials) {
  if (credentials.client.id && credentials.client.secret) {
    return simpleOauth.create(credentials);
  } else {
      console.log('missing secret or id');
    // throw new Error("missing secret or id");
  }
}

/* Create oauth2 instance to use in our two functions */

const creds = {
  client: {
    id: config.clientId,
    secret: config.clientSecret
  },
  auth: {
    tokenHost: config.tokenHost,
    tokenPath: config.tokenPath,
    authorizePath: config.authorizePath
  }
};

export default authInstance(creds);
