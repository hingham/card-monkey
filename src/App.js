import React, { Component } from "react";
import { Provider } from "react-redux";

import CardMonkey from "./CardMonkey.js";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

import createStore from "./store/index.js";
import oauth from "./lambda/utils/oauth.js";
const store = createStore();

export const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: "/.netlify/functions/graphql",
      credentials: "same-origin"
    })
  ]),
  cache: new InMemoryCache()
});

export default class App extends Component {
  state = { 
    message: "",
    deckSelected: false,
  };

  testPost = () => {
    fetch("/.netlify/functions/post", {
      body: JSON.stringify({
        title: "han",
        description: "hanbanan",
        model: "notes"
      }),
      method: "POST"
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(message => console.log(message))
      .catch(error => console.error(error));
  };


  getCookies = () => {
    console.log( 'cookies', document.cookie );
  }

 
  getValues = () =>{
    fetch("/.netlify/functions/auth-callback")
    .then(res => console.log('did fetch', res))
    .catch(err => console.error(err));
  }

  render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <div>
            {/* <button onClick={() => this.testPost()}>post</button> */}
            <div>{this.state.message}</div>
            <CardMonkey/>
          </div>
          <p>Login with github</p>
          <div onClick={()=>this.goAuth()}>
            github
          </div>
          <a href="/.netlify/functions/auth">github link</a>
        </ApolloProvider>

        <button onClick={()=>this.getCookies()}>get cookies</button>
      </Provider>
    );
  }
}
