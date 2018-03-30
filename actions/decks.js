import { getDecks, saveDeckTitle, updateDeck, removeDeck } from '../utils/storageAPI'

export const GET_ALL_DECKS = 'GET_ALL_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const EDIT_DECK = 'EDIT_DECK'
export const INC_CARDS = 'INC_CARDS'
export const DEC_CARDS = 'DEC_CARDS'
export const DELETE_DECK = 'DELETE_DECK'

export const fetchDecks = () => (dispatch) => 
    getDecks().then((decks) => {
        dispatch(getAllDecks(decks))
    })

export const renameDeck = (oldTitle, newTitle) => (dispatch) => 
    updateDeck(oldTitle, newTitle).then(() =>{
        dispatch(editDeck(oldTitle, newTitle))
    })

export const deleteDeck = (title) => (dispatch) => 
    removeDeck(title).then(() =>{
        dispatch(_deleteDeck(title))
    })

export const addDeck = (title) => (dispatch) => 
    saveDeckTitle(title).then(() => {
        dispatch(addNewDeck(title))
    })

export const incrementCards = (title) => ({
    type: INC_CARDS,
    title
})

export const decrementCards = (title) => ({
    type: DEC_CARDS,
    title
})

const _deleteDeck = (title) => ({
    type: DELETE_DECK,
    title
})


const editDeck = (oldTitle, newTitle) => ({
    type: EDIT_DECK,
    oldTitle,
    newTitle
})

const addNewDeck = (title) => ({
    type: ADD_DECK,
    title
})

const getAllDecks = (decks) => ({
    type: GET_ALL_DECKS,
    decks
})
