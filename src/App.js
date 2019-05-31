import React, { Component } from "react";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";


import MyQuery from './components/query/query.js';

const client = new ApolloClient({
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
      uri: '/.netlify/functions/graphql',
      credentials: "same-origin"
    })
  ]),
  cache: new InMemoryCache()
});

export default class App extends Component {
  state = { message: "" };

  runFunction = () => {
    fetch("/.netlify/functions/hello")
      .then(res => res.json())
      .then(({ message }) => this.setState({ message: message }))
      .catch(err => console.error(err));
    console.log(this.state);
  };

  testPost = () => {
    fetch("/.netlify/functions/post", {
      body: JSON.stringify({ title: "han", description: "hanbanan", model: "notes" }),
      method: "POST"
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(message => console.log(message))
      .catch(error => console.error(error));
  };

  testCreate = () => {
    fetch("/.netlify/functions/create", {
      body: JSON.stringify({ title: "clean", time: "now", task: "sweep" }),
      method: "POST"
    })
      .then(response => {
        console.log(response);
        return response.text();
      })
      .then(message => console.log(message));
  };

  render() {
    return (
      <ApolloProvider client={client}>

        <div>
          <header>hello</header>
          <button onClick={() => this.runFunction()}>clickme</button>
          <button onClick={() => this.testPost()}>post</button>
          <button onClick={() => this.testCreate()}>create</button>
          <div>{this.state.message}</div>
          <MyQuery/>
        </div>

      </ApolloProvider>
    );
  }
}
