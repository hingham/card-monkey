import React from "react";
import { DeckStore, CardInterface, UserIdInterface } from '../../types/index'
import Card from '../card/card'
import CardForm from '../form/card-form';
/* eslint-disable no-unused-expressions */
/*eslint no-unused-expressions: [2, { allowShortCircuit: true }]*/

import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks'
import { connect } from "react-redux";
import { string } from "prop-types";
import { addResolveFunctionsToSchema } from "graphql-tools";

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
      _id
    }
  }
`;

type PropTypes = {
  data: DeckStore;
}

function QueryComponent(props: PropTypes): any {
  const { loading, error, data, refetch } =
    useQuery<DeckCardData, DeckCardVars>(DECK_CARDS_QUERY, { variables: { deck_id: props.data.deck_id } });

  const refetchData = () => {
    refetch();
  }

  if (loading) {
    return "Loading...";
  }
  else if (error) {
    return `Error! ${error.message}`;
  }
  return (
    <div className="cards">
      <ul>
        {data && data.cards.map((card: CardInterface, i: number) => (
          <Card key={`${i}-card`} concept={card.concept} definition={card.definition} _id={card._id} refetchData={refetchData} />
        ))}
      </ul>
      {/* <button onClick={() => refetchData()}>refetch</button> */}
      <CardForm refetchData={refetchData} />
    </div>
  );
}

const mapStateToProps = (state: { data: DeckStore }) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  null
)(QueryComponent);
