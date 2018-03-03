import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import reducer from './reducers'
import CardsStatusBar from './components/CardsStatusBar'
import Decks from './views/Decks'
import Icon from 'react-native-vector-icons/FontAwesome'
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
    }
})

class App extends Component {
    store = createStore(reducer)

    render() {
        return (
            <Provider store={this.store}>
                <View style={{ flex: 1 }}>
                    <CardsStatusBar
                        backgroundColor={lightGray}
                    />
                    <MainNavigator />
                </View>
            </Provider>
        )
    }
}

export default App
