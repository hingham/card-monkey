import React from "react";
import { DeckStore, CardInterface, UserIdInterface, DeckInterface } from '../../types/index'
import Card from '../card/card'
import CardForm from '../form/card-form';
/* eslint-disable no-unused-expressions */
/*eslint no-unused-expressions: [2, { allowShortCircuit: true }]*/

import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks'
import { connect } from "react-redux";

interface DeckCardData {
    decks: any;
}

interface DeckSearchVars {
    tag: string;
}

const DECK_SEARCH_QUERY = gql`
query ($tag: String){
    decks (tag: $tag) {
      deck
      cards {
        concept
      }
    }
  }
`;


type PropTypes = {
    tag: string;
    data: any
}

function DeckSeachResults(props: PropTypes): any {
    const { loading, error, data } =
        useQuery<DeckCardData, DeckSearchVars>(DECK_SEARCH_QUERY, { variables: { tag: props.tag } });

    if (loading) {
        return "Loading...";
    }
    else if (error) {
        return `Error! ${error.message}`;
    }
    return (
        <div className="decks">
            <ul>
                {data && data.decks && data.decks.cards && data.decks.map((deck: DeckInterface, i: number) => {
                    <li>
                        {deck.deck}
                        {/* <ul>
                            {deck && deck.cards.map((card: CardInterface, i: number) => (
                                <Card key={`${i}-card`} concept={card.concept} definition={card.definition} _id={card._id} tags={card.tags} refetchData={refetchData} />
                            ))}
                        </ul> */}
                    </li>
                })}
            </ul>
            {/* <button onClick={() => refetchData()}>refetch</button> */}
        </div>
    );
}

const mapStateToProps = (state: { data: DeckStore }) => ({
    data: state.data
});

export default connect(
    mapStateToProps,
    null
)(DeckSeachResults);

