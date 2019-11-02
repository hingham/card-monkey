import { string } from "prop-types";

export type DeckStore = {
    deck: string,
    deck_id: string,
    user_git_id: number,
    user_id: string
}

// export type Deck = {
//     deck?: string,
//     deck_id?: number,
//     model: string
// }

export interface CardInterface {
    deck?: string;
    concept: string;
    definition: string,
    deck_id?: string,
    model?: string
    _id: string;
}

export interface CardInputInterface {
    deck?: string;
    concept: string;
    definition: string,
    deck_id?: string,
    model?: string
}

export interface DeckInterface {
    deck: string;
    _id?: string;
    owner_id?: string;
}

export interface UserIdInterface {
    _id: string;
    git_id: number;
}



export class Card implements CardInputInterface {
    concept: string;
    definition: string;
    model: string;
    deck: string;
    deck_id: string;

    constructor(
        concept: string,
        definition: string,
        deck: string,
        deck_id: string
    ) {
        this.concept = concept;
        this.definition = definition;
        this.model = "cards";
        this.deck = deck;
        this.deck_id = deck_id;
    }
}

export class Deck implements DeckInterface {
    deck: string;
    model: string;
    owner_id: string;
    constructor(
        deck: string,
        owner_id: string
    ) {
        this.deck = deck;
        this.owner_id = owner_id;
        this.model = "deck";
    }
}
