import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import { DeckStore, CardInputInterface, Card } from "../../types";

interface CardFormProps {
  data: DeckStore;
  refetchData: Function;
}

interface CardFormInterface extends CardInputInterface {
  toggleForm: boolean;
}

class CardForm extends Component<CardFormProps, CardFormInterface>{
  state: CardFormInterface = {
    concept: "",
    definition: "",
    toggleForm: false
  };

  toggleForm = () => {
    this.setState({ toggleForm: !this.state.toggleForm });
  }

  handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { concept, definition } = this.state;
    const { deck, deck_id } = this.props.data;

    const newCard = new Card(concept, definition, deck, deck_id);

    fetch("/.netlify/functions/post", {
      body: JSON.stringify(newCard),
      method: "POST"
    })
      // Q: do I need this?
      // .then(response => response.json())
      .then(() => this.props.refetchData())
      .catch(error => {
        console.log(error);
        return <div> error </div>
      });
  };

  handleClearForm = () => {
    this.setState({ concept: "", definition: "" });
    console.log(this.state);
  };

  handleConcept = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({ concept: e.currentTarget.value });
  };

  handleDefinition = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    this.setState({ definition: e.currentTarget.value });
  };

  render() {

    if (this.state.toggleForm === true) {
      return (
        <form className="card" onSubmit={this.handleFormSubmit}>
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
            <label htmlFor="definition">  Definition:  </label>
            <textarea
              rows={80}
              cols={20}
              name="definition"
              value={this.state.definition}
              onChange={this.handleDefinition}
            />
            <button type="submit">Create Card </button>
          </fieldset>
        </form>
      );
    }

    return (
      <section id="card-page-actions">
        <ul>
          <li onClick={() => this.toggleForm()}>
            + Create Card
          </li>
          <li onClick={() => this.toggleForm()}>
            + Search Cards
          </li>
          <li onClick={() => this.toggleForm()}>
            + View Decks
          </li>
        </ul>

      </section>
    )
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

