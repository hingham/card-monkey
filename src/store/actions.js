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

  export const setUser = payload =>{

    console.log('payload from user action', payload)
    return {
      type: "USER",
      payload: payload
    }
  }