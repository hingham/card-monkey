import React, { Component } from "react";

export default class App extends Component {
  state = { message: "" };

  runFunction = () => {
    fetch("/.netlify/functions/hello")
      .then(res => res.json())
      .then(({ message }) => this.setState({ message: message }))
      .catch(err => console.error(err));
    console.log(this.state);
  };

  testCreate = () => {
    fetch("/.netlify/functions/post", {
      body: JSON.stringify({title: 'clean', time: 'now', task: "sweep"}),
      method: "POST"
    }).then(response => {
      console.log(response);
      return response.json();
    })
    .then(message=> console.log(message))
  };

  render() {
    return (
      <div>
        <header>hello</header>
        <button onClick={() => this.runFunction()}>clickme</button>
        <button onClick={() => this.testCreate()}>create</button>
        <div>{this.state.message}</div>
      </div>
    );
  }
}
