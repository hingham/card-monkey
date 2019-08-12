import React from "react";
import { DeckStore, DeckInterface } from '../../types/index'
import { useQuery } from '@apollo/react-hooks';
/* eslint-disable no-unused-expressions */

import gql from "graphql-tag";
import { Query } from "react-apollo";
import { connect } from 'react-redux';
import * as actions from "../../store/actions"

/*eslint no-unused-expressions: [2, { allowShortCircuit: true }]*/

interface DeckData {
  decks: DeckInterface[]
}

const DECKS_QUERY = gql`
  {
    decks {
      deck
      _id
    }
  }
`;

type QueryComProps = {
  data: DeckStore;
}


type InputType = {
  changeDeck: Function;
  props: QueryComProps
}



function QueryComponent({ changeDeck, props }: InputType): any {

  // const updateDeck = (d: object) => {
  //   console.log(d);
  //   dispatch(actions.changeDeck(d));
  // }

  const { loading, error, data } =
    useQuery<DeckData>(DECKS_QUERY);
  if (loading) {
    return "Loading...";
  }

  else if (error) {
    return `Error! ${error.message}`;
  }
  return (
    <>
      <section className="decks">
        <h2>Decks</h2>
        <ul>
          {data && data.decks.map((deck, i) => (
            <li key={`deck${i}`} onClick={() => changeDeck(deck)}>{deck.deck}</li>
          ))}
        </ul>
      </section>
    </>
  )

  // return (
  //   <Query query={DECKS}>
  //     {({ loading, error, data }) => {
  //       if (loading) {
  //         return "Loading...";
  //       }
  //       if (error) {
  //         return `Error! ${error.message}`;
  //       }
  //       return (
  //         <>
  //           <section class="decks">
  //             <h2>Decks</h2>
  //             <ul>
  //               {data.decks.map((deck, i) => (
  //                 <li key={`deck${i}`} onClick={() => this.updateDeck(deck)}>{deck.deck}</li>
  //               ))}
  //             </ul>
  //           </section>
  //         </>
  //       );
  //     }}
  //   </Query>
  // )

}

const mapStateToProps = (state: QueryComProps) => ({
  data: state.data
});


const mapDispatchToProps = (dispatch: any, getState: any) => ({
  changeDeck: (payload: any) => dispatch(actions.changeDeck(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QueryComponent);
