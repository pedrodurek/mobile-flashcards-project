import { getCardsFromDeck, addCardToDeck } from '../utils/storageAPI'

export const GET_CARDS = 'GET_CARDS'

export const fetchCardsFromDeck = (deckTitle) => (dispatch) => 
    getCardsFromDeck().then((cards) => {
        dispatch(getCards(cards))
    })

export const addCard = (deckTitle, card) => (dispatch) => 
    addCardToDeck(deckTitle, card)


const getCards = (cards) => ({
    type: GET_CARDS,
    cards
})
