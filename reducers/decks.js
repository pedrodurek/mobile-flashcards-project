import { GET_ALL_DECKS, ADD_DECK, INC_CARDS } from '../actions/decks'

const initialState = []

const decks = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DECKS:
            return action.decks
        case ADD_DECK:
            const { title } = action
            return [...state, { title, numCards: 0 }]
        case INC_CARDS:
            return state.map((deck) => {
                if (deck.title === action.title) {
                    return {
                        ...deck,
                        numCards: deck.numCards + 1
                    }
                }
                return deck
            })
        default:
            return state
    }
}

export default decks
