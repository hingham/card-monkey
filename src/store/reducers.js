
let initialState = {
    deck: "",
    deck_id: "",
    user_git_id: null
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

      case "USER":
      let myState = {...state, user_git_id: payload}
      console.log(myState);
      return myState;
  
      default:
        return state;
    }
  };
  