import { GET_ALL_DECKS } from '../actions/decks'

const initialState = []

const decks = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DECKS:
            return action.decks
        default:
            return state
    }
}

export default decks
