import React, { Component, MouseEvent } from "react";
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import { DeckStore, CardInputInterface, Card } from "../../types";

interface CardFormProps {
  data: DeckStore;
  refetchData: Function;
  clearDeck: (event: MouseEvent) => { type: "CLEAR" };
}

interface CardFormInterface extends CardInputInterface {
  toggleForm: boolean;
}

class CardForm extends Component<CardFormProps, CardFormInterface>{
  state: CardFormInterface = {
    concept: "",
    definition: "",
    toggleForm: false,
    tags: []
  };

  toggleForm = () => {
    this.setState({ toggleForm: !this.state.toggleForm });
  }

  handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { concept, definition, tags } = this.state;
    const { deck, deck_id } = this.props.data;

    const newCard = new Card(concept, definition, deck, deck_id, tags);

    fetch("/.netlify/functions/post", {
      body: JSON.stringify(newCard),
      method: "POST"
    })
      .then(() => {
        this.props.refetchData()
        this.setState({ toggleForm: !this.state.toggleForm });
      })
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

  handleTags = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const tagsArr = e.currentTarget.value.replace(" ", "").split(",");
    this.setState({ tags: tagsArr });
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
            <label htmlFor="tags">  Tags:  </label>
            <textarea
              rows={40}
              cols={20}
              name="tags"
              value={this.state.tags}
              placeholder={"cloud technologies, aws, serverless"}
              onChange={this.handleTags}
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
          <li onClick={this.props.clearDeck}>
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
  changeDeck: (payload: any) => dispatch(actions.changeDeck(payload)),
  clearDeck: (e: any) => dispatch(actions.clearDeck(e)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardForm);

