import { DeckStore } from "../types/index";

type DeckData = {
  type: string,
  payload: any
}

const initialState: DeckStore = {
  deck: "",
  deck_id: "",
  user_git_id: NaN
}

export function deckReducer(state = initialState, action: DeckData): DeckStore {
  let { type, payload } = action;

  switch (type) {
    case "DECK":
      let newState = { ...state, deck: payload.deck, deck_id: payload._id };

      console.log('new state', newState);
      return newState;


    case "CLEAR":
      return {
        ...state,
        deck: "",
        deck_id: "",
        user_git_id: NaN
      }


    case "USER":
      console.log('user payload reducers', payload)
      let myState = { ...state, user_git_id: payload }

      console.log('redux state', payload, myState);
      return myState;

    default:
      return state;
  }
};

