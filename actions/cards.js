import { getCardsFromDeck } from '../utils/storageAPI'

export const GET_CARDS = 'GET_CARDS'

export const fetchCardsFromDeck = (deckTitle) => (dispatch) => {

    getCardsFromDeck().then((cards) => {
        dispatch(getCards(cards))
    })

}


const getCards = (cards) => ({
    type: GET_CARDS,
    cards
})
