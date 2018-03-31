import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import { StackNavigator } from 'react-navigation'
import thunk from 'redux-thunk'
import Decks from '@screens/Decks'
import DeckView from '@screens/DeckView'
import AddEditCard from '@screens/AddEditCard'
import NewEditDeck from '@screens/NewEditDeck'
import Quiz from '@screens/Quiz'
import Home from '@screens/Home'
import reducer from '@reducers'

const MainNavigator = StackNavigator({
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

class App extends Component {
    render() {
        const store = createStore(reducer, applyMiddleware(thunk))
        return (
            <Provider store={store}>
                <View style={{ flex: 1, backgroundColor: '#43A047' }}>
                    <StatusBar barStyle="light-content" />
                    <MainNavigator />
                </View>
            </Provider>
        )
    }
}

export default App
