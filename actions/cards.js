import { getDecks } from '../utils/storageAPI'
export const GET_ALL_DECKS = 'GET_ALL_DECKS'

export const fetchDecks = () => (dispatch) => {

    getDecks().then((decks) => {
        dispatch(getAllDecks(decks))
    })

}

const getAllDecks = (decks = []) => ({
    type: GET_ALL_DECKS,
    decks
})
