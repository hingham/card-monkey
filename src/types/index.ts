export type DeckStore = {
    deck: string,
    deck_id: string,
    user_git_id: number
}

export type Deck = {
    deck?: string,
    deck_id?: number,
    model: string
}

export interface CardInterface {
    deck?: string;
    concept?: string;
    definition?: string,
    deck_id?: string,
    model?: string
}
