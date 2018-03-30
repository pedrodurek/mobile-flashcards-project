import { GET_CARDS, EDIT_CARD, DELETE_CARD } from '../actions/cards'

const initialState = []

const cards = (state = initialState, action) => {
    switch (action.type) {
        case GET_CARDS:
            return action.cards
        case EDIT_CARD:
            return [
                ...state.slice(0, action.index),
                { ...action.card },
                ...state.slice(action.index+1)
            ]
        case DELETE_CARD:
            return state.filter((card, index) => action.index !== index)
        default:
            return state
    }
}

export default cards
