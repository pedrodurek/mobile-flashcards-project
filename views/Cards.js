import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { fetchCardsFromDeck } from '../actions/cards'

class Cards extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.deck.title
    })

    addCard = () => {}

    startQuiz = () => 
        this.props.navigation.navigate('AddCards')

    render() {
        const { navigation } = this.props
        return (
            <View>
                <Text>{navigation.state.params.deck.title}</Text>
                <Text>{`${navigation.state.params.deck.numCards} cards`}</Text>
                <TouchableOpacity onPress={this.addCard}>
                    <Text>
                        Add Card
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.startQuiz}>
                    <Text>
                        Start Quiz
                    </Text>
                </TouchableOpacity>
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
