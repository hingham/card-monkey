This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


## Starting the App
Get the functions running
`npm run netlify-lambda`


Start the App
`npm start`


## What I had to install
npm install @types/react-redux


## How Data is (should) Pulled 
1. Check that user is loggin in via checking cookies sent from 0auth
2. Grab all the decks that are associated with that user in the deck-query component
3. When a deck_id is selected, grab all the cards associated with that deck id (or cards nested in that deck id? would make it rather shallow, but then it would be harder to query based on topic...)



## Loggin Users Out 
[Auth0 Docs](https://auth0.com/docs/logout)
1. Application Session Layer: Remove Cookies
2. Auth0 Session Layer: clearing SSO cookie???
3. The App will have to access github again to make sure the user has been verified and given permissions, but since the permission has been given and the app has been authorized you won't be able to login as someone else

## Refresh Cards
- the Card-Query component implements the Card-Form components
- Card-Query has access to refetch function from apollo, which is passes down to the card-form component
- This enables the from submit to trigger a refresh and show the new card added to the deck
