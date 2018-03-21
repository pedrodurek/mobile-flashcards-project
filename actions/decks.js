import { getDecks, saveDeckTitle } from '../utils/storageAPI'

export const GET_ALL_DECKS = 'GET_ALL_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const INC_CARDS = 'INC_CARDS'

export const fetchDecks = () => (dispatch) => {
    getDecks().then((decks) => {
        dispatch(getAllDecks(decks))
    })
}

export const addDeck = (title) => (dispatch) => {
    return saveDeckTitle(title).then(() => {
        dispatch(addNewDeck(title))
    })
}

export const incrementCards = (title) => ({
    type: INC_CARDS,
    title
})


const addNewDeck = (title) => ({
    type: ADD_DECK,
    title
})

const getAllDecks = (decks) => ({
    type: GET_ALL_DECKS,
    decks
})
