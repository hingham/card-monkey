import React, { Component } from "react"

export default class form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      concept: null,
      definition: null,
    }
  }

  handleFormSubmit = () => {
    fetch("/.netlify/functions/post", {
      body: JSON.stringify(this.state),
      method: "POST"
    })
      .then(response =>  response.json())
      .then(message => console.log(message))
      .catch(error => console.error(error));
  };

  handleClearForm = () => {
    this.setState({ location: "", description: "" })
    console.log(this.state)
  }

  handleConcept = e => {
    this.setState({ description: e.target.value })
    e.preventDefault()
  }

  handleDefinition = e => {
    this.setState({ location: e.target.value })
    e.preventDefault()
    // console.log('state', this.state);
  }

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
    )
  }
}