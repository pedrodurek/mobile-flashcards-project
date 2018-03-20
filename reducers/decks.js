import { GET_ALL_DECKS, ADD_DECK } from '../actions/decks'

const initialState = []

const decks = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DECKS:
            return action.decks
        case ADD_DECK:
            const { title } = action
            return [...state, { title, numCards: 0 }]
        default:
            return state
    }
}

export default decks
