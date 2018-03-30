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
            const decks = JSON.parse(result)
            return Object.keys(decks).map((title) => ({
                title,
                numCards: decks[title].questions.length
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
            const { questions } = JSON.parse(result)[deckTitle]
            return questions.map((question) => ({
                ...question,
                title: deckTitle
            }))
        }
        return []
    })

export const getFavoriteCards = () =>
    AsyncStorage.getItem(DECKS_STORAGE_KEY).then((result) => {
        if (result) {
            const decks = JSON.parse(result)
            let cards = []
            Object.keys(decks).forEach((title) => {
                cards = [
                    ...cards,
                    ...decks[title].questions.reduce((acc, question, index) => {
                        if (question.favorite) {
                            acc.push({ ...question, title, index })
                        }
                        return acc
                    }, [])
                ]
            })
            return cards
        }
    })

export const saveDeckTitle = (title) => {
    let deck = {}
    deck[title] = { title, questions: [] }
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck))
}

export const updateDeck = (oldTitle, newTitle) =>
    getDeck(oldTitle).then((deck) => {
        removeDeck(oldTitle).then(() =>
            AsyncStorage.mergeItem(
                DECKS_STORAGE_KEY,
                JSON.stringify({
                    [newTitle]: {
                        ...deck,
                        title: newTitle
                    }
                })
            )
        )
    })

export const removeDeck = (title) =>
    AsyncStorage.getItem(DECKS_STORAGE_KEY).then((result) => {
        let json = JSON.parse(result)
        delete json[title]
        return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(json))
    })

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

export const updateCardOnDeck = (title, index, card) =>
    getDeck(title).then((result) =>
        AsyncStorage.mergeItem(
            DECKS_STORAGE_KEY,
            JSON.stringify({
                [title]: {
                    questions: [
                        ...result.questions.slice(0, index),
                        { ...card },
                        ...result.questions.slice(index + 1)
                    ]
                }
            })
        )
    )

export const removeCardFromDeck = (title, index) =>
    getDeck(title).then((result) =>
        AsyncStorage.mergeItem(
            DECKS_STORAGE_KEY,
            JSON.stringify({
                [title]: {
                    questions: [
                        ...result.questions.filter((card, i) => index !== i)
                    ]
                }
            })
        )
    )
