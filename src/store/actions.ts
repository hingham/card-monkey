
import * as constants from '../constants/';

export interface ChangeDeck {
  type: constants.DECK;
  payload: any
}

export interface ClearDeck {
  type: constants.CLEAR;
}

export interface SetUser {
  type: constants.USER;
  payload: any;
}

export interface ClearUserData {
  type: constants.USERDATA;
}


export const changeDeck = (payload: any): ChangeDeck => {
  return {
    type: "DECK",
    payload: payload
  };
}

export const clearDeck = (): ClearDeck => {
  return {
    type: "CLEAR"
  }
}


export const setUser = (payload: any): SetUser => {
  return {
    type: "USER",
    payload: payload
  }
}

export const clearUserData = (): ClearUserData => {
  return {
    type: "USERDATA"
  }
}

export type DeckData = ChangeDeck | ClearDeck | SetUser;