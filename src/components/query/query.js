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
            <h2>hello</h2>
            <div>
              {data.players.map(player => (
                <div>{player.name}</div>
              ))}
            </div>
          </>
        );
      }}
    </Query>
  );
}

// export default queryComponent;
