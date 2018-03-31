import { StackNavigator } from 'react-navigation'
import Decks from '@screens/Decks'
import DeckView from '@screens/DeckView'
import AddEditCard from '@screens/AddEditCard'
import NewEditDeck from '@screens/NewEditDeck'
import Quiz from '@screens/Quiz'
import Home from '@screens/Home'
import { darkGreen, white } from '@colors'

export const navOptions = (title) => ({
    title,
    headerTitleStyle: { color: white },
    headerStyle: {
        backgroundColor: darkGreen
    },
    headerTintColor: white
})

export const MainNavigator = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: navOptions('Home')
    },
    Decks: {
        screen: Decks,
        navigationOptions: navOptions('Decks')
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
        screen: Quiz,
        navigationOptions: navOptions('Quiz')
    }
})
