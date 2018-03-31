import {
    getCardsFromDeck,
    addCardToDeck,
    updateCardOnDeck,
    removeCardFromDeck,
    getFavoriteCards
} from '../utils/storageAPI'
import uuidv1 from 'uuid/v1'

export const GET_CARDS = 'GET_CARDS'
export const EDIT_CARD = 'EDIT_CARD'
export const DELETE_CARD = 'DELETE_CARD'

export const fetchCardsFromDeck = (deckTitle) => (dispatch) =>
    getCardsFromDeck(deckTitle).then((cards) => {
        dispatch(getCards(cards))
    })

export const fetchFavoriteCards = () => (dispatch) =>
    getFavoriteCards().then((cards) => {
        dispatch(getCards(cards))
    })

export const addCard = (deckTitle, card) => (dispatch) =>
    addCardToDeck(deckTitle, {
        id: uuidv1(),
        ...card
    })

export const editCard = (title, card) => (dispatch) =>
    updateCardOnDeck(title, card).then(() => {
        dispatch(_editCard({ ...card, title }))
    })

export const deleteCard = (title, id) => (dispatch) =>
    removeCardFromDeck(title, id).then(() => {
        dispatch(_deleteCard(id))
    })

const _editCard = (card) => ({
    type: EDIT_CARD,
    card
})

export const _deleteCard = (id) => ({
    type: DELETE_CARD,
    id
})

const getCards = (cards) => ({
    type: GET_CARDS,
    cards
})
