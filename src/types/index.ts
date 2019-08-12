export type DeckStore = {
    deck: string,
    deck_id: string,
    user_git_id: number,
    user_id: string
}

export type Deck = {
    deck?: string,
    deck_id?: number,
    model: string
}

export interface CardInterface {
    deck?: string;
    concept: string;
    definition: string,
    deck_id?: string,
    model?: string
}

export interface DeckInterface {
    deck: string;
    _id: string;
}

export interface UserInterface {
    _id: string;
    git_id: number;
}
