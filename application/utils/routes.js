import { StackNavigator, Navigator } from 'react-navigation'
import uuidv1 from 'uuid/v1'
import Decks from '@screens/Decks'
import DeckView from '@screens/DeckView'
import AddEditCard from '@screens/AddEditCard'
import NewEditDeck from '@screens/NewEditDeck'
import Quiz from '@screens/Quiz'
import Home from '@screens/Home'
import { darkGreen, white } from '@colors'

export const navOptions = (title) => ({
    title,
    headerTitleStyle: { color: white, fontFamily: 'nunito-bold' },
    headerStyle: {
        backgroundColor: darkGreen
    },
    headerBackTitleStyle: {
        fontFamily: 'nunito-bold'
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

const prevGetStateForAction = MainNavigator.router.getStateForAction
MainNavigator.router.getStateForAction = (action, state) => {
    if (state && action.type === 'ReplaceCurrentScreen') {
        let routes = state.routes.slice(0, state.routes.length - 1)
        routes.push({ ...action, key: uuidv1() })
        return { ...state, routes, index: routes.length - 1 }
    }
    return prevGetStateForAction(action, state)
}
