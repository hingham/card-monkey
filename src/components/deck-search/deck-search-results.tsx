import React from "react";
import { DeckStore, CardInterface, DeckCardInterface } from '../../types/index'
import Card from "../card/card";
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
      tags
      cards {
        concept
        definition
      }
    }
  }
`;

type PropTypes = {
  tag: string;
}

function DeckSeachResults(props: PropTypes): any {
  const { loading, error, data } =
    useQuery<DeckCardData, DeckSearchVars>(DECK_SEARCH_QUERY, { variables: { tag: props.tag } });
  console.log("tag in search query ", props.tag);
  if (loading) {
    return "Loading...";
  }
  else if (error) {
    return `Error! ${error.message}`;
  }
  return (
    <div className="deck-search">
      <ul>
        {data && data.decks && data.decks.map((deck: DeckCardInterface, i: number) => (
          <li key={i}>
            <h3><u>{deck.deck}</u>: {deck.tags.map((tag) => `#${tag}`).join(", ")}</h3>
            <ul>
              {deck && deck.cards.map((card: CardInterface, i: number) => (
                <li key={i}>
                  <h4>{card.concept}</h4>
                  <p>{card.definition.slice(0, 50)}...</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
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

