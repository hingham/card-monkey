import React, { Component } from "react";
import {connect} from 'react-redux';
import cards from "../../lambda/models/cards";
import * as actions from "../../store/actions.js";

//Takes in prop from stores deck

class CardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      concept: null,
      definition: null,
      deck_id: this.props.data.deck_id,
      deck: this.props.data.deck,
      model: "cards",
    };
  }

  handleFormSubmit = () => {
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

  handleConcept = e => {
    this.setState({ concept: e.target.value });
    e.preventDefault();
  };

  handleDefinition = e => {
    this.setState({ definition: e.target.value });
    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <fieldset>
          <legend>Add a Card</legend>
          <label>
            Concept:
            <input
              name="concept"
              type="text"
              value={this.state.concept}
              onChange={this.handleConcept}
            />
          </label>
          <label>
            Definition:
            <textarea
              name="definition"
              type="text-area"
              value={this.state.definition}
              onChange={this.handleDefinition}
            />
          </label>

          <input type="submit" value="Submit" />
        </fieldset>
      </form>
    );
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
)(CardForm);

