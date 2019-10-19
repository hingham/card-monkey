import React, { Component } from "react";
import { DeckInterface, DeckStore, Deck } from '../../types/index';

import { connect } from 'react-redux';
import * as actions from "../../store/actions";


interface DeckProps {
  data: DeckStore;
  refetchData: Function;
}

class DeckForm extends Component<DeckProps, DeckInterface> {

  state: DeckInterface = {
    deck: ""
  };

  handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    fetch("/.netlify/functions/post", {
      body: JSON.stringify(
        new Deck(this.state.deck, this.props.data.user_id)
      ),
      method: "POST"
    })
      .then(response => response.json())
      .then(message => this.props.refetchData())
      .catch(error => {
        console.error(error)
        // return (
        //   <div> Error adding card </div>
        // )
      });
  };

  handleClearForm = () => {
    this.setState({ deck: "" });
    console.log(this.state);
  };

  handleDeck = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ deck: e.currentTarget.value });
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <fieldset>
          <legend>Add a Deck</legend>
          <label htmlFor="deck"> Deck Form </label>
          <input
            id="deck"
            placeholder="deck name"
            name="deck"
            type="text"
            value={this.state.deck}
            onChange={this.handleDeck}
          />
          <button type="submit"> Create Deck </button>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = (state: DeckProps) => ({
  data: state.data
});


const mapDispatchToProps = (dispatch: any) => ({
  changeDeck: (payload: any) => dispatch(actions.changeDeck(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckForm);