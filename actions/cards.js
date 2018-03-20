import { getCardsFromDeck, addCardToDeck } from '../utils/storageAPI'

export const GET_CARDS = 'GET_CARDS'
export const ADD_CARD = 'ADD_CARD'

export const fetchCardsFromDeck = (deckTitle) => (dispatch) => {

    getCardsFromDeck().then((cards) => {
        dispatch(getCards(cards))
    })

}

export const addCard = (deckTitle, card) => (dispatch) => {

    addCardToDeck(deckTitle, card).then(() => {
        dispatch(addNewCard(card))
    })

}

const getCards = (cards) => ({
    type: GET_CARDS,
    cards
})

const addNewCard = (card) => ({
    type: ADD_CARD,
    card
})
