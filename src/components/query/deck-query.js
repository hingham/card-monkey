import React from "react";
/* eslint-disable no-unused-expressions */

import gql from "graphql-tag";
import { Query } from "react-apollo";
import { connect } from 'react-redux';
import * as actions from "../../store/actions"

/*eslint no-unused-expressions: [2, { allowShortCircuit: true }]*/

const DECKS = gql`
  {
    decks {
      deck
      _id
    }
  }
`;


class queryComponent extends React.Component {

  updateDeck = (d) => {
    console.log(d);
    this.props.changeDeck(d);
  }

  render() {
    return (
      <Query query={DECKS}>
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
                <h2>Decks</h2>
                <ul>
                  {data.decks.map((deck, i) => (
                    <li key={`deck${i}`} onClick={() => this.updateDeck(deck)}>{deck.deck}</li>
                  ))}
                </ul>
              </section>
            </>
          );
        }}
      </Query>
    )
  }
}

const mapStateToProps = state => ({
  data: state.data
});


const mapDispatchToProps = (dispatch, getState) => ({
  changeDeck: payload => dispatch(actions.changeDeck(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(queryComponent);
