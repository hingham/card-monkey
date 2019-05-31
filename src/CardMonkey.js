import React, { Component } from "react";
import DeckForm from "./components/form/deck-form.js";
import DeckQuery from "./components/query/deck-query.js";
import Deck from "./components/deck/deck.js";
import CardQuery from "./components/query/card-query.js";
import CardForm from "./components/form/card-form.js";

import { If, When, Else, Then } from "./components/conditionals.js";

import * as actions from "./store/actions.js";

import { connect } from "react-redux";

class CardMonkey extends Component {
  render() {
    return (
      <section>
        <DeckForm />
        <If condition={this.props.data.deck_id}>
          <Then>
              <h2>{this.props.data.deck}</h2>
            <CardQuery />
            <CardForm/>
          </Then>
          <Else>
            <DeckQuery />
          </Else>
        </If>

        <button onClick={this.props.clearDeck}> View Decks </button>
        {/* <Deck /> */}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data
});

const mapDispatchToProps = (dispatch, getState) => ({
  changeDeck: payload => dispatch(actions.changeDeck(payload)),
  clearDeck: () => dispatch(actions.clearDeck())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardMonkey);
