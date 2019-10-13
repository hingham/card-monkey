
import * as constants from '../constants/';
import { UserIdInterface } from "../types/index";

export interface ChangeDeck {
  type: constants.DECK;
  payload: any
}

export interface ClearDeck {
  type: constants.CLEAR;
}

export interface SetUser {
  type: constants.SETUSER;
  payload: UserIdInterface;
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

export const clearDeck = (event: MouseEvent): ClearDeck => {
  return {
    type: "CLEAR"
  }
}


export const setUser = (userIdObj: UserIdInterface): SetUser => {
  return {
    type: "SETUSER",
    payload: userIdObj
  }
}

export const clearUserData = (): ClearUserData => {
  return {
    type: "USERDATA"
  }
}

export type DeckData = ChangeDeck | ClearDeck | SetUser;