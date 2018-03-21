import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { fetchCardsFromDeck } from '../actions/cards'
import HeaderCards from '../components/HeaderCards'
import { Button, Text } from 'native-base'

class DeckView extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: (
            <HeaderCards
                title={navigation.state.params.title}
                navigation={navigation}
            />
        )
    })

    addCard = () =>
        this.props.navigation.navigate('AddCard', {
            title: this.props.deck.title
        })

    startQuiz = () =>
        this.props.navigation.navigate('Quiz', { title: this.props.deck.title })

    render() {
        const { deck } = this.props
        return (
            <View>
                <Text>{deck.title}</Text>
                <Text>{`${deck.numCards} cards`}</Text>
                <Button primary onPress={this.addCard}>
                    <Text>Add Card</Text>
                </Button>
                <Button primary onPress={this.startQuiz}>
                    <Text>Start Quiz</Text>
                </Button>
            </View>
        )
    }
}

const mapStateToProps = ({ decks }, { navigation }) => ({
    deck: decks.find((deck) => deck.title === navigation.state.params.title)
})

const mapDispatchToProps = {
    fetchCardsFromDeck
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckView)
