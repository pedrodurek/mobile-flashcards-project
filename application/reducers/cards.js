import { GET_CARDS, EDIT_CARD, DELETE_CARD } from '../actions/cards'

const initialState = []

const cards = (state = initialState, action) => {
    switch (action.type) {
        case GET_CARDS:
            return action.cards || []
        case EDIT_CARD:
            return state.map((card) => {
                if (card.id === action.card.id) {
                    return action.card
                }
                return card
            })
        case DELETE_CARD:
            return state.filter((card) => card.id !== action.id)
        default:
            return state
    }
}

export default cards
