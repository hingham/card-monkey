import React, { Component } from "react";
import DeckForm from "./components/form/deck-form";
import DeckQuery from "./components/query/deck-query";
import CardQuery from "./components/query/card-query";
import CardForm from "./components/form/card-form";

import { DeckStore, UserInterface } from './types/index';

import gql from "graphql-tag";
import { client } from "./App.js";

import { If, Else, Then } from "./components/utils/conditionals";

import * as actions from "./store/actions";
import { connect } from "react-redux";



const USER = gql`
  query($git_id: Int!) {
    user(git_id: $git_id) {
      _id
    }
  }
`;

type PropTypes = {
    data: DeckStore;
    setUser: Function;
    clearDeck: Function;
}

interface CardMonkeyState extends UserInterface {
    promise: Promise<number>
}


class CardMonkey extends Component<any, CardMonkeyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            promise: this.getUser(),
            git_id: NaN,
            _id: ''
        };
        console.log("state", this.state);

    }

    getUser = async () => {
        const regexp = new RegExp(`.*user=([^;]*)`);
        const result = regexp.exec(document.cookie);
        if (result && result[1]) {
            console.log('the result', result[1]);

            let git_id = parseInt(result[1]);
            let user_id = await this.setUserId(git_id);
            this.props.setUser({ git_id, user_id });

            console.log(`the values ${git_id}, ${user_id}`);

            return parseInt(result[1]);
        } else {
            console.log("not logged in");
            return NaN;
        }
    };

    setUserId = (git_id: number) => {
        return client
            .query({
                query: USER,
                variables: { git_id: git_id }
            })
            .then((results: any) => {
                console.log('results ', results, results.data.user._id);
                return results.data.user._id
            })
    }


    render() {
        if (this.props.data.deck_id) {
            return (
                <>
                    <h2>{this.props.data.deck}</h2>
                    <CardQuery />
                    <CardForm />
                    <button onClick={this.props.clearDeck}> View Decks </button>
                </>
            )
        }
        else {
            return (
                <>
                    <DeckQuery />
                    <DeckForm />
                </>
            )
        }
    }
}

const mapStateToProps = (state: PropTypes) => ({
    data: state.data
});

const mapDispatchToProps = (dispatch: any) => ({
    clearDeck: () => dispatch(actions.clearDeck()),
    setUser: (payload: UserInterface) => dispatch(actions.setUser(payload))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardMonkey);
