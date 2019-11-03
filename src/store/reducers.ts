import { DeckStore } from "../types/index";

type DeckData = {
  type: string,
  payload: any
}

const initialState: DeckStore = {
  deck: "",
  deck_id: "",
  user_git_id: NaN,
  user_id: '',
  deck_creation: false
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


    case "SETUSER":
      console.log('user payload reducers', payload)
      let { git_id, _id } = payload;
      let myState = { ...state, user_git_id: git_id, user_id: _id };

      console.log('redux state', myState);
      return myState;

    case "USERDATA":
      return { ...state, user_id: '', user_git_id: NaN, deck: "", deck_id: "" };

    case "NEWDECK":
      return { ...state, deck_creation: true };

    case "CREATEDECK":
      console.log("PAYLOAD", payload);
      return { ...state, deck: payload.deck, deck_id: payload._id, deck_creation: false };

    default:
      return state;
  }
};

