import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'flahcards:decks'

const decks = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer:
                    'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}

export const getDecks = () => {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((result) => {
        if (!result) {
            // let decks = JSON.parse(result)
            return Object.keys(decks).map((deck) => ({
                title: decks[deck].title,
                numCards: decks[deck].questions.length
            }))
        }
        return []
    })
}