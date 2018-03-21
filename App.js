import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import thunk from 'redux-thunk'
import Icon from 'react-native-vector-icons/FontAwesome'
import Decks from './views/Decks'
import DeckView from './views/DeckView'
import AddCard from './views/AddCard'
import NewDeck from './views/NewDeck'
import reducer from './reducers'
import { lightGray, blueIOS } from './utils/colors'

const Tabs = TabNavigator(
    {
        Decks: {
            screen: Decks,
            navigationOptions: {
                tabBarLabel: 'Decks',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name={'glass'} size={30} color={tintColor} />
                )
            }
        },
        NewDeck: {
            screen: NewDeck,
            navigationOptions: {
                tabBarLabel: 'New Deck',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name={'glass'} size={30} color={tintColor} />
                )
            }
        }
    },
    {
        navigationOptions: {
            header: null
        },
        tabBarOptions: {
            activeTintColor: blueIOS,
            style: {
                backgroundColor: lightGray
            }
        }
    }
)

const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs
    },
    DeckView: {
        screen: DeckView
    },
    AddCard: {
        screen: AddCard
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
