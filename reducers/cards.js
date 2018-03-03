import { GET_ALL_DECKS } from '../actions/cards'

const initialState = []

const cards = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DECKS:
            return action.decks
        default:
            return state
    }
}

export default cards
