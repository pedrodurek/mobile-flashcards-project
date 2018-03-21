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

export const getDecks = () =>
    AsyncStorage.getItem(DECKS_STORAGE_KEY).then((result) => {
        if (result) {
            let decks = JSON.parse(result)
            return Object.keys(decks).map((deck) => ({
                title: decks[deck].title,
                numCards: decks[deck].questions.length
            }))
        }
        return []
    })

export const getDeck = (title) =>
    AsyncStorage.getItem(DECKS_STORAGE_KEY).then((result) => ({
        ...JSON.parse(result)[title]
    }))

export const getCardsFromDeck = (deckTitle) =>
    AsyncStorage.getItem(DECKS_STORAGE_KEY).then((result) => {
        if (result) {
            return result[deckTitle].questions
        }
        return []
    })

export const saveDeckTitle = (title) => {
    let deck = {}
    deck[title] = { title, questions: [] }
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck))
}

export const addCardToDeck = (title, card) =>
    getDeck(title).then((result) =>
        AsyncStorage.mergeItem(
            DECKS_STORAGE_KEY,
            JSON.stringify({
                [title]: {
                    questions: [...result.questions, { ...card }]
                }
            })
        )
    )
