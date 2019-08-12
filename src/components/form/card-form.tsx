import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from "../../store/actions";

import { DeckStore, CardInterface } from "../../types";


interface CardFormProps {
  data: DeckStore;
}


class CardForm extends Component<CardFormProps, CardInterface>{

  readonly state = {
    concept: "",
    definition: "",
    model: "cards"
  };


  handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('state from card', this.state);
    fetch("/.netlify/functions/post", {
      body: JSON.stringify(this.state),
      method: "POST"
    })
      .then(response => response.json())
      .then(message => console.log(message))
      .catch(error => console.error(error));
  };

  handleClearForm = () => {
    this.setState({ concept: "", definition: "" });
    console.log(this.state);
  };

  handleConcept = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ concept: e.currentTarget.value });
    e.preventDefault();
  };

  handleDefinition = (e: React.FormEvent<HTMLTextAreaElement>) => {
    this.setState({ definition: e.currentTarget.value });
    console.timeLog('the target value on change:', e);
    e.preventDefault();
  };

  render() {
    // const { deck_id, deck } = this.props.data;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <fieldset>
          <legend>Add a Card</legend>
          <label htmlFor="concept"> Concept: </label>
          <input
            id="concept"
            name="concept"
            type="text"
            value={this.state.concept}
            onChange={this.handleConcept}
          />
          <label htmlFor="definition">  Definition: </label>
          <textarea
            name="definition"
            value={this.state.definition}
            onChange={this.handleDefinition}
          />

          <button type="submit">Create Card </button>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = (state: CardFormProps) => ({
  data: state.data
});


const mapDispatchToProps = (dispatch: any) => ({
  changeDeck: (payload: any) => dispatch(actions.changeDeck(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardForm);

