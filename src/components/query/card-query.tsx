import React from "react";
import { DeckStore, CardInterface } from '../../types/index'
import Card from '../card/card'
/* eslint-disable no-unused-expressions */
/*eslint no-unused-expressions: [2, { allowShortCircuit: true }]*/

import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks'
import { connect } from "react-redux";
import { string } from "prop-types";

concept: string;
definition: string;

interface DeckCardData {
  cards: CardInterface[];
}

interface DeckCardVars {
  deck_id: string;
}

const DECK_CARDS_QUERY = gql`
  query ($deck_id: String!){
    cards(deck_id: $deck_id) {
      concept
      definition
      deck_id
    }
  }
`;

type QueryComProps = {
  data: DeckStore;
}

type CardProps = {
  concept: string;
  definition: string;
}


function QueryComponent(props: QueryComProps): any {
  const { loading, error, data } =
    useQuery<DeckCardData, DeckCardVars>(DECK_CARDS_QUERY, { variables: { deck_id: props.data.deck_id } });


  if (loading) {
    return "Loading...";
  }
  else if (error) {
    return `Error! ${error.message}`;
  }
  return (
    <>
      <ul>
        {data && data.cards.map((card: CardInterface, i: number) => (
          <Card key={`${i}-card`} concept={card.concept} definition={card.definition} />
        ))}
      </ul>
    </>
  );

}

const mapStateToProps = (state: QueryComProps) => ({
  data: state.data
});



export default connect(
  mapStateToProps,
  null
)(QueryComponent);
