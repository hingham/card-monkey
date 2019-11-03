import React, { Component } from "react";
import { DeckInterface, DeckStore, Deck } from '../../types/index';

import { connect } from 'react-redux';
import * as actions from "../../store/actions";


interface DeckProps {
  data: DeckStore;
  createDeck: Function;
  // refetchData: Function;
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
      .then(response => {
        return response.json();
      })
      .then((response) => {
        this.props.createDeck(response.res)
      })
      // .then(message => this.props.refetchData())
      .catch(error => {
        console.error(error)
        return (
          <div> Error adding deck </div>
        )
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
      <section>
        <form className="deck" onSubmit={this.handleFormSubmit}>
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
      </section>
    );
  }
}

const mapStateToProps = (state: DeckProps) => ({
  data: state.data
});


const mapDispatchToProps = (dispatch: any) => ({
  createDeck: (payload: any) => dispatch(actions.createDeck(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckForm);