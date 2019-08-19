import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store";

import App from "./App";

import { ApolloProvider } from "@apollo/react-hooks";
import { client } from './apollo-client.js';

const store = configureStore();

const Root = () => (
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>
);

render(<Root />, document.getElementById("root"));
