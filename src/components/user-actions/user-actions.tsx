import React from "react";
import DeckThumbSVG from '../../meta/components/deck-thumb-icon';
import DeckSVG from '../../meta/components/deck-icon';
import CardSVG from '../../meta/components/card-icon';
import { DeckStore, DeckInterface } from '../../types/index'
import DeckForm from '../form/deck-form';

import { connect } from 'react-redux';
import * as actions from "../../store/actions"

type UserActionProps = {
    data: DeckStore;
    newDeck: Function;
}

function UserActions(props: UserActionProps): any {
    return (
        <section id="user-actions">
            <ul>
                <li onClick={() => props.newDeck()}>
                    {/* render a form components for deck query */}
                    <h4>Create New Deck</h4>
                    <DeckThumbSVG width="40%" />
                </li>
                <li>
                    <h4>Create New Card</h4>
                    <CardSVG width="40%" />
                </li>
                <li>
                    <h4>Your Decks</h4>
                    < DeckSVG width="40%" />
                </li>
                <li>
                    <h4>Trending Decks</h4>
                    < DeckSVG width="40%" />
                </li>
            </ul>
        </section>
    )
}

const mapStateToProps = (state: UserActionProps) => ({
    data: state.data
});

const mapDispatchToProps = (dispatch: any, getState: any) => ({
    newDeck: (payload: any) => dispatch(actions.newDeck())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserActions);