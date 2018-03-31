import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Font } from 'expo'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import thunk from 'redux-thunk'
import reducer from '@reducers'
import { MainNavigator } from '@routes'

class App extends Component {
    state = {
        loading: true
    }

    async componentDidMount() {
        await Font.loadAsync({
            'nunito-bold': require('@fonts/Nunito-Bold.ttf')
        })
        this.setState({ loading: false })
    }

    render() {
        const store = createStore(reducer, applyMiddleware(thunk))
        if (!this.state.loading) {
            return (
                <Provider store={store}>
                    <View style={{ flex: 1, backgroundColor: '#43A047' }}>
                        <StatusBar barStyle="light-content" />
                        <MainNavigator />
                    </View>
                </Provider>
            )
        }
        return null
    }
}

export default App
