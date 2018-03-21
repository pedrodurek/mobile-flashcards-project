import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { StackNavigator } from 'react-navigation'
import thunk from 'redux-thunk'
import Decks from './views/Decks'
import DeckView from './views/DeckView'
import AddCard from './views/AddCard'
import NewDeck from './views/NewDeck'
import Quiz from './views/Quiz'
import Home from './views/Home'
import reducer from './reducers'

const MainNavigator = StackNavigator({
    Home: {
        screen: Home
    },
    Decks: {
        screen: Decks
    },
    NewDeck: {
        screen: NewDeck
    },
    DeckView: {
        screen: DeckView
    },
    AddCard: {
        screen: AddCard
    },
    Quiz: {
        screen: Quiz
    }
})

class App extends Component {
    render() {
        const store = createStore(reducer, applyMiddleware(thunk))
        return (
            <Provider store={store}>
                <View style={{ flex: 1 }}>
                    <MainNavigator />
                </View>
            </Provider>
        )
    }
}

export default App
