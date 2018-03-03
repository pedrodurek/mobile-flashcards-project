import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'
import reducer from './reducers'
import CardsStatusBar from './components/CardsStatusBar'

class App extends Component {
    
    store = createStore(reducer)
    
    render() {
        return (
            <Provider store={this.store}>
                <View>
                    
                </View>
            </Provider>
        )
    }
}

export default App