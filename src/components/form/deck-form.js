import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      model: "deck"
    };
  }

  handleFormSubmit = () => {
    fetch("/.netlify/functions/post", {
      body: JSON.stringify(this.state),
      method: "POST"
    })
      .then(response => response.json())
      .then(message => console.log(message))
      .catch(error => console.error(error));
  };

  handleClearForm = () => {
    this.setState({ deck: "" });
    console.log(this.state);
  };

  handleDeck = e => {
    this.setState({ deck: e.target.value });
    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <fieldset>
          <legend>Add a Deck</legend>
          <label>
            Deck:
            <input
              name="deck"
              type="text"
              value={this.state.deck}
              onChange={this.handleDeck}
            />
          </label>
          <input type="submit" value="Submit" />
        </fieldset>
      </form>
    );
  }
}


export default Form;
