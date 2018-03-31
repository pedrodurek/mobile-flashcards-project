import {
    GET_ALL_DECKS,
    ADD_DECK,
    INC_CARDS,
    EDIT_DECK,
    DELETE_DECK,
    DEC_CARDS
} from '../actions/decks'

const initialState = []

const decks = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DECKS:
            return action.decks
        case ADD_DECK:
            const { title } = action
            return [...state, { title, numCards: 0 }]
        case EDIT_DECK:
            const { oldTitle, newTitle } = action
            let newState = state.map((deck) => {
                if (deck.title === oldTitle) {
                    return {
                        [newTitle]: {
                            ...deck[oldTitle],
                            title: newTitle
                        }
                    }
                }
                return deck
            })
            return newState
        case INC_CARDS:
            return state.map((deck) => {
                if (deck.title === action.title) {
                    return { ...deck, numCards: deck.numCards + 1 }
                }
                return deck
            })
        case DEC_CARDS:
            return state.map((deck) => {
                if (deck.title === action.title) {
                    return { ...deck, numCards: deck.numCards - 1 }
                }
                return deck
            })
        case DELETE_DECK:
            return state.filter((deck) => deck.title !== action.title)
        default:
            return state
    }
}

export default decks
