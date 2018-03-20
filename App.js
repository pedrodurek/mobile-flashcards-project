import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import thunk from 'redux-thunk'
import Icon from 'react-native-vector-icons/FontAwesome'
import CardsStatusBar from './components/CardsStatusBar'
import Decks from './views/Decks'
import Cards from './views/Cards'
import AddCard from './views/AddCard'
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
    Cards: {
        screen: Cards
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
