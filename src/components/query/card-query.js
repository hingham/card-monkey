import React from "react";
/* eslint-disable no-unused-expressions */

import gql from "graphql-tag";
import { Query } from "react-apollo";

import { connect } from "react-redux";
import * as actions from "../../store/actions.js";
/*eslint no-unused-expressions: [2, { allowShortCircuit: true }]*/

const DECK_CARDS = gql`
  query ($deck_id: String!){
    cards(deck_id: $deck_id) {
      concept
      definition
    }
  }
`;

function queryComponent(props) {
  return (
    <Query query={DECK_CARDS} variables={{deck_id: props.deck_id}}>
      {({ loading, error, data }) => {
        if (loading) {
          return "Loading...";
        }
        if (error) {
          return `Error! ${error.message}`;
        }
        return (
          <>
            <div>
              {data.cards.map(card => (
                <>
                <div>{card.concept}</div>
                <div>{card.definition}</div>
                <hr/>
                </>
              ))}
            </div>
          </>
        );
      }}
    </Query>
  );
}

const mapStateToProps = state => ({
  deck_id: state.data.deck_id
});

const mapDispatchToProps = (dispatch, getState) => ({
  changeDeck: payload => dispatch(actions.changeDeck(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(queryComponent);
