import React, { Component } from "react";
import DeckForm from "./components/form/deck-form.js";
import DeckQuery from "./components/query/deck-query.js";
import Deck from "./components/deck/deck.js";
import CardQuery from "./components/query/card-query.js";
import CardForm from "./components/form/card-form.js";

import gql from "graphql-tag";
import { Query } from "react-apollo";
import { client } from "./App.js";

import { If, When, Else, Then } from "./components/conditionals.js";

import * as actions from "./store/actions.js";

import { connect } from "react-redux";

const USER = gql`
  query($git_id: Int!) {
    user(git_id: $git_id) {
      _id
    }
  }
`;

class CardMonkey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      git_id: this.getUser(),
      _id: this.setUserId(this.git_id)
    };
    console.log("state", this.state);

  }

  getUser = () => {
    const regexp = new RegExp(`.*user=([^;]*)`);
    const result = regexp.exec(document.cookie);
    if (result && result[1]) {
      console.log( 'the result', result[1] );
      this.props.setUser( result[1] );
      return result[1];
    } else {
      console.log("not logged in");
    }
    // this.setUserId( parseInt(result[1]) );
   
  };

  //TODO: Put this in the reducer and just set in the store
  setUserId = (git) => {
    //TODO: check if there is already a user saved in the store's session
    //TODO: if already there, do not requery
    if(git === null){
      return null;
    }
    client
    .query({
      query: USER,
      variables: { git_id: parseInt(git) }
    })
    .then(results => {
      console.log("results", results);
      // this.setState({ id: results.data.user._id });
      return results.data.user._id
    });
  }

  render() {
    return (
      <section>
        <If condition={this.props.data.deck_id}>
          <Then>
            <h2>{this.props.data.deck}</h2>
            <CardQuery />
            <CardForm />
          </Then>
          <Else>
            <DeckQuery />
          </Else>
        </If>
        <DeckForm />

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
  clearDeck: () => dispatch(actions.clearDeck()),
  setUser: payload => dispatch(actions.setUser(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardMonkey);
