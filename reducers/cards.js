import { GET_CARDS, ADD_CARD } from '../actions/cards'

const initialState = []

const cards = (state = initialState, action) => {
    
    switch (action.type) {
        case GET_CARDS:
            return action.cards
        case ADD_CARD:
            return [
                ...state,
                ...card
            ]
        default:
            return state
    }
    
}

export default cards