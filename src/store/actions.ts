
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

export interface NewDeck {
  type: constants.NEWDECK;
}

export interface CreateDeck {
  type: constants.CREATEDECK;
  payload: any;
}

export interface SearchDeck {
  type: constants.SEARCHDECK;
  payload: any;
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

export const newDeck = (): NewDeck => {
  return {
    type: "NEWDECK"
  }
}

export const createDeck = (payload: any): CreateDeck => {
  return {
    type: "CREATEDECK",
    payload: payload
  }
}

export const searchDeck = (payload?: string | ""): SearchDeck => {
  return {
    type: "SEARCHDECK",
    payload: payload
  }
}


export type DeckData = ChangeDeck | ClearDeck | SetUser | NewDeck;