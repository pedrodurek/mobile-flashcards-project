import { GET_CARDS } from '../actions/cards'

const initialState = []

const cards = (state = initialState, action) => {
    
    switch (action.type) {
        case GET_CARDS:
            return action.cards
        default:
            return state
    }
    
}

export default cards