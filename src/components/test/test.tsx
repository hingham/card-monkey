import React, { Component } from 'react'
// import DeckForm from "../form/deck-form.tsx";



export default class Test extends Component<{name: string}> {
    render() {
        return (
            <div>
                {/* <DeckForm /> */}
                <p> This is a Test {this.props.name}</p>
            </div>
        )
    }
}
