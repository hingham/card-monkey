import React from "react";
import DeckSearchForm from '../deck-search/deck-search-form';
import DeckSearchResults from '../deck-search/deck-search-results';

import DeckSVG from '../../meta/components/deck-icon';
import CardSVG from '../../meta/components/card-icon';
import { DeckStore, DeckInterface } from '../../types/index'

import { connect } from 'react-redux';
import * as actions from "../../store/actions"
import { stat } from "fs";

type SearchProps = {
    deck_search_value: string;
    deck_seaerch: boolean
}

function SearchDeck(props: any): any {
    console.log("search", props);
    if (props.data.deck_search && props.data.deck_search_value) {
        console.log("search and value", props.data);
        return (
            <>
                <DeckSearchForm />
                <DeckSearchResults tag={props.data.deck_search_value} />
            </>
        )
    } else if (props.data.deck_search) {
        console.log("search", props.data);

        return (
            <DeckSearchForm />
        )
    }
}

const mapStateToProps = (state: any) => ({
    data: state.data
});

const mapDispatchToProps = (dispatch: any, getState: any) => ({
    newDeck: (payload: any) => dispatch(actions.newDeck()),
    searchDeck: () => dispatch(actions.searchDeck())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchDeck);