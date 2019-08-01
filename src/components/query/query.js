import React from "react";
/* eslint-disable no-unused-expressions */

import gql from "graphql-tag";
import { Query } from "react-apollo";

/*eslint no-unused-expressions: [2, { allowShortCircuit: true }]*/

const PLAYERS = gql`
  {
    players {
      name
    }
  }
`;

export default function queryComponent({ hello }) {
  return (
    <Query query={PLAYERS}>
      {({ loading, error, data }) => {
        if (loading) {
          return "Loading...";
        }
        if (error) {
          return `Error! ${error.message}`;
        }
        return (
          <>
          <section class="decks">
            <h2>hello</h2>
            <ul>
              {data.players.map(player => (
                <li>{player.name}</li>
              ))}
            </ul>
            </section>
          </>
        );
      }}
    </Query>
  );
}

// export default queryComponent;
