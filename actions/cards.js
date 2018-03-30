import {
    getCardsFromDeck,
    addCardToDeck,
    updateCardOnDeck,
    removeCardFromDeck
} from '../utils/storageAPI'

export const GET_CARDS = 'GET_CARDS'
export const EDIT_CARD = 'EDIT_CARD'
export const DELETE_CARD = 'DELETE_CARD'

export const fetchCardsFromDeck = (deckTitle) => (dispatch) =>
    getCardsFromDeck(deckTitle).then((cards) => {
        dispatch(getCards(cards))
    })

export const addCard = (deckTitle, card) => (dispatch) =>
    addCardToDeck(deckTitle, card)

export const editCard = (title, index, card) => (dispatch) => 
    updateCardOnDeck(title, index, card).then(() => {
        dispatch(_editCard(card, index))
    })

export const deleteCard = (title, index) => (dispatch) => 
    removeCardFromDeck(title, index).then(() => {
        dispatch(_deleteCard(index))
    })


const _editCard = (card, index) => ({
    type: EDIT_CARD,
    card,
    index
})

const _deleteCard = (index) => ({
    type: DELETE_CARD,
    index
})

const getCards = (cards) => ({
    type: GET_CARDS,
    cards
})
