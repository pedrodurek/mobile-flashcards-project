import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { fetchCardsFromDeck } from '../actions/cards'

class Cards extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.deck.title
    })

    render() {
        const { navigation } = this.props
        return (
            <View>
                <Text>{navigation.state.params.deck.title}</Text>
                <Text>{`${navigation.state.params.deck.numCards} cards`}</Text>
            </View>
        )
    }
}

const mapStateToProps = ({ cards }) => ({
    cards
})

const mapDispatchToProps = {
    fetchCardsFromDeck
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards)
