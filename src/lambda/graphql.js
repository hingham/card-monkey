// src-functions/graphql.js
import { ApolloServer, gql } from "apollo-server-lambda";
import connectToDatabase from "./db";
import decks from "./models/decks";
import cards from "./models/cards";
import users from "./models/users";


connectToDatabase();

let articles = [
  { title: "my-title", body: "my body", id: 1 },
  { title: "my-next-title", body: "my next body", id: 2 }
];

const typeDefs = gql`
  type Query {
    articles: [Article]
    user(git_id: Int!): User
    decks: [Deck]
    myDecks(owner_id: String!, first: Int): [Deck]
    cards(deck_id: String!): [Card]
  }
  type Article {
    title: String
    body: String
    id: Int
  }

  type User {
    _id: String
    git_id: Int
    login: String
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

    decks: () => {
      return decks.find({});
    },
    myDecks: (parent, args) => {
      if (args.first) {
        return decks.find({ owner_id: args.owner_id }).limit(args.first);
      }
      return decks.find({ owner_id: args.owner_id });
    },
    cards: (parent, args) => {
      return cards.find({ deck_id: args.deck_id })
    },
    user: (parent, args) => {
      return users.findOne({ git_id: args.git_id })
    }
  },
  Deck: {
    cards: (parent, args) => {
      console.log('parent', parent);
      return cards.find({ deck_id: parent._id })
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
