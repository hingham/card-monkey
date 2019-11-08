import React, { Component } from "react";
import { DeckInterface, DeckStore, Deck } from '../../types/index';

import { connect } from 'react-redux';
import * as actions from "../../store/actions";


interface DeckSearchProps {
    data: DeckStore;
    searchDeck: Function;
}

interface DeckSearchStateInterface {
    deck_concept: string;
    searchSubmitted: false;
}

class DeckSearchForm extends Component<DeckSearchProps, DeckSearchStateInterface> {

    state: DeckSearchStateInterface = {
        deck_concept: "",
        searchSubmitted: false
    };

    handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        this.props.searchDeck(this.state.deck_concept);
    };

    handleClearForm = () => {
        this.setState({ deck_concept: "" });
        console.log(this.state);
    };

    handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({ deck_concept: e.currentTarget.value });
    };

    render() {
        return (
            <form className="deck_search" onSubmit={this.handleFormSubmit}>
                <fieldset>
                    <legend>Seach Decks by Topic: </legend>
                    <input
                        id="deck_search"
                        name="deck_search"
                        type="text"
                        value={this.state.deck_concept}
                        onChange={this.handleSearch}
                    />
                    <button type="submit"> Search </button>
                </fieldset>
            </form>
        );
    }
}

const mapStateToProps = (state: DeckSearchProps) => ({
    data: state.data
});


const mapDispatchToProps = (dispatch: any) => ({
    searchDeck: (payload: any) => dispatch(actions.searchDeck(payload))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeckSearchForm);