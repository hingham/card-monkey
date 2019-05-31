// src-functions/graphql.js
import { ApolloServer, gql } from "apollo-server-lambda";

import connectToDatabase from "./db";
import players from "./models/players.js";

connectToDatabase();

let articles = [
  { title: "my-title", body: "my body", id: 1 },
  { title: "my-next-title", body: "my next body", id: 2 }
];

const typeDefs = gql`
  type Query {
    articles: [Article]
    players: [Player]
  }
  type Article {
    title: String
    body: String
    id: Int
  }

  type Player {
    name: String!
  }
`;

const resolvers = {
  Query: {
    articles: () => articles,
    players: () => {
      return players.find({});
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // enables introspection of the schema
  playground: true // enables the actual playground
});

exports.handler = server.createHandler();
