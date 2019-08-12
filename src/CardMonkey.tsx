import React, { Component } from "react";
import DeckForm from "./components/form/deck-form";
import DeckQuery from "./components/query/deck-query";
import CardQuery from "./components/query/card-query";
import CardForm from "./components/form/card-form";

import { DeckStore, UserType } from './types/index';

import gql from "graphql-tag";
import { client } from "./App.js";

import { If, Else, Then } from "./components/utils/conditionals";

import * as actions from "./store/actions";
import { connect } from "react-redux";



const USER = gql`
  query($git_id: Int!) {
    user(git_id: $git_id) {
      _id
    }
  }
`;

type PropTypes = {
  data: DeckStore;
  setUser: Function;
  clearDeck: Function;
}


class CardMonkey extends Component<any, UserType> {
  constructor(props: any) {
    super(props);
    this.state = {
      git_id: this.getUser(),
      _id: this.setUserId(this.state.git_id)
    };
    console.log("state", this.state);

  }

  getUser = () => {
    const regexp = new RegExp(`.*user=([^;]*)`);
    const result = regexp.exec(document.cookie);
    if (result && result[1]) {
      console.log('the result', result[1]);
      this.props.setUser(result[1]);
      return result[1];
    } else {
      console.log("not logged in");
      return "";
    }
    // this.setUserId( parseInt(result[1]) );

  };

  //TODO: Put this in the reducer and just set in the store
  setUserId = (git_id: string) => {
    //TODO: check if there is already a user saved in the store's session
    //TODO: if already there, do not requery
    if (git_id !== '') {
      client
        .query({
          query: USER,
          variables: { git_id: parseInt(git_id) }
        })
        .then(results => {
          console.log("results", results);
          // this.setState({ id: results.data.user._id });
          return results.data.user._id
        });
    }

    return '';

  }

  render() {
    return (
      <section>
        {/* <If condition={this.props.data.deck_id}> */}
        <Then>
          <h2>{this.props.data.deck}</h2>
          <CardQuery />
          <CardForm />
        </Then>
        <Else>
          <DeckQuery />
        </Else>
        {/* </If> */}
        <DeckForm />

        <button onClick={this.props.clearDeck}> View Decks </button>
        {/* <Deck /> */}
      </section>
    );
  }
}

const mapStateToProps = (state: PropTypes) => ({
  data: state.data
});

const mapDispatchToProps = (dispatch: any) => ({
  // changeDeck: (payload: ) => dispatch(actions.changeDeck(payload)),
  clearDeck: () => dispatch(actions.clearDeck()),
  setUser: (payload: string) => dispatch(actions.setUser(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardMonkey);
