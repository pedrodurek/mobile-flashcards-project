import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'flahcards:decks'

export const getDecks = () => {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then((result) => {
        if (result) {
            return JSON.parse(result)
        }
        return []

    })
}