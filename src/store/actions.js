export const changeDeck = payload => {
  console.log(payload);
    return {
      type: "DECK",
      payload: payload
    };
  };

  export const clearDeck = () =>{
    return {
      type: "CLEAR",
    }
  }