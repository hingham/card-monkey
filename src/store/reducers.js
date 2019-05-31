
let initialState = {
    deck: "",
    deck_id: "",
  };
  
  export default (state = initialState, action) => {
    let { type, payload } = action;
  
    switch (type) {
      case "DECK":
      let newState = {...state, deck: payload.deck, deck_id: payload._id};
      console.log('new state', newState);
      return newState;

      case "CLEAR":
      return {...state, deck: "", deck_id: ""}
  
      default:
        return state;
    }
  };
  