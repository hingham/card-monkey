import React, { FunctionComponent } from "react";
import { DeckStore, CardInterface } from '../../types/index'
/* eslint-disable no-unused-expressions */

import gql from "graphql-tag";
import { Query } from "react-apollo";

import { useQuery } from '@apollo/react-hooks'
import { connect } from "react-redux";
/*eslint no-unused-expressions: [2, { allowShortCircuit: true }]*/

interface DeckCardData {
  cards: CardInterface[];
}

interface DeckCardVars {
  deck_id: string;
}

const DECK_CARDS_QUERY = gql`
  query ($deck_id: String!){
    cards(deck_id: $deck_id) {
      deck
      concept
      definition
      deck_id
    }
  }
`;

type QueryComProps = {
  data: DeckStore;
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
  else if (data) {
    return (
      <>
        <ul>
          {data.cards.map((card: CardInterface, i: number) => (
            <li key={`${i}-card`}>
              <div>{card.concept}</div>
              <div>{card.definition}</div>
            </li>
          ))}
        </ul>
      </>
    );
  }
  else {
    return "something went wrong"
  }
  // return (
  //       if (loading) {
  //         return "Loading...";
  //       }
  //       if (error) {
  //         return `Error! ${error.message}`;
  //       }
  //       return (
  //         <>
  //           <ul>
  //             {data.cards.map((card, i) => (
  //               <li key={`${i}-card`}>
  //                 <div>{card.concept}</div>
  //                 <div>{card.definition}</div>
  //               </li>
  //             ))}
  //           </ul>
  //         </>
  //       );
  //     }}
  // );
}

const mapStateToProps = (state: QueryComProps) => ({
  data: state.data
});



export default connect(
  mapStateToProps,
  null
)(QueryComponent);
