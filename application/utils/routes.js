import { StackNavigator } from 'react-navigation'
import Decks from '@screens/Decks'
import DeckView from '@screens/DeckView'
import AddEditCard from '@screens/AddEditCard'
import NewEditDeck from '@screens/NewEditDeck'
import Quiz from '@screens/Quiz'
import Home from '@screens/Home'

export const MainNavigator = StackNavigator({
    Home: {
        screen: Home
    },
    Decks: {
        screen: Decks
    },
    NewEditDeck: {
        screen: NewEditDeck
    },
    DeckView: {
        screen: DeckView
    },
    AddEditCard: {
        screen: AddEditCard
    },
    Quiz: {
        screen: Quiz
    }
})
