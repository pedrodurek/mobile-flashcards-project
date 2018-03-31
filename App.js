import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import thunk from 'redux-thunk'
import reducer from '@reducers'
import { MainNavigator } from '@routes'

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
