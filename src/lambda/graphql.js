// src-functions/graphql.js
import { ApolloServer, gql } from "apollo-server-lambda";

import connectToDatabase from "./db";
import players from "./models/players.js";
import decks from "./models/decks.js";
import cards from "./models/cards.js";


connectToDatabase();

let articles = [
  { title: "my-title", body: "my body", id: 1 },
  { title: "my-next-title", body: "my next body", id: 2 }
];

const typeDefs = gql`
  type Query {
    articles: [Article]
    players: [Player]
    decks: [Deck]
    cards(deck_id: String!): [Card]
  }
  type Article {
    title: String
    body: String
    id: Int
  }

  type Player {
    name: String!
  }

  type Deck {
    deck: String!
    _id: String!
    cards: [Card]
  }

  type Card {
      deck_id: String!
      _id: String!
      concept: String
      definition: String
  }
`;

const resolvers = {
  Query: {
    articles: () => articles,
    players: () => {
      return players.find({});
    },
    decks: () => {
      return decks.find({});
    },
    cards: (parent, args) =>{
        return cards.find({deck_id: args.deck_id})
    }
  },
  Deck: {
      cards: (parent, args) =>{
        console.log('parent', parent);
        return cards.find({deck_id: parent._id})
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
