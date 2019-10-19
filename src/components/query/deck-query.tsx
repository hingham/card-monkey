/* eslint-disable no-unused-expressions */
/*eslint no-unused-expressions: [2, { allowShortCircuit: true }]*/
import React from "react";
import { DeckStore, DeckInterface } from '../../types/index'
import { useQuery } from '@apollo/react-hooks';

import DeckForm from '../form/deck-form';
import DeckThumbSVG from '../../meta/components/deck-thumb-icon';
import DeckSVG from '../../meta/components/deck-icon';
import CardSVG from '../../meta/components/card-icon';

import gql from "graphql-tag";
import { connect } from 'react-redux';
import * as actions from "../../store/actions"

interface DeckData {
  myDecks: DeckInterface[]
}

interface DeckVars {
  owner_id: string;
  first?: number;
}

const MY_DECKS_QUERY = gql`
query ($owner_id: String!, $first: Int){
    myDecks(owner_id: $owner_id, first: $first){
      deck
      _id
    }
  }
`;

type QueryComProps = {
  data: DeckStore;
  changeDeck: Function;
  width?: string;
}

type InputType = {
  changeDeck: Function;
}

function QueryComponent(props: QueryComProps): any {
  console.log('!!!!test user id', props)

  const { loading, error, data, refetch } =
    useQuery<DeckData, DeckVars>(MY_DECKS_QUERY, {
      variables: {
        owner_id: props.data.user_id, first: 4
      }
    });

  if (loading) {
    return "Loading...";
  }

  else if (error) {
    return `Error! ${error.message}`;
  }

  return (
    <>
      <section className="decks">
        <div className="box-shawdow" id="quiz-start">
          <h2 onClick={() => console.log('clicked quiz me')}>
            Quiz Me
          </h2>
        </div>

        <div>
          <section>
            <h2>Recent Decks
           <span style={{ margin: "0em 0em -10px 20px" }}>
                < DeckSVG width="15%" />
              </span>
            </h2>
            <ul>
              {data && data.myDecks && data.myDecks.map((deck, i) => (
                <li key={`deck${i}`} onClick={() => props.changeDeck(deck)}>
                  {deck.deck}
                </li>
              ))}
            </ul>
          </section>

          <section id="user-actions">
            <ul>
              <li>
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
        </div>

        {/* <DeckForm refetchData={refetch} /> */}

      </section>
    </>
  )
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
