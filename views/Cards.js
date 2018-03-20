import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { fetchCardsFromDeck } from '../actions/cards'
import HeaderCards from '../components/HeaderCards'
import { Button, Text } from 'native-base'

class Cards extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: (
            <HeaderCards
                title={navigation.state.params.deck.title}
                navigation={navigation}
            />
        )
    })

    addCard = () => this.props.navigation.navigate('AddCard')

    startQuiz = () => this.props.navigation.navigate('AddCard')

    render() {
        const { navigation } = this.props
        return (
            <View>
                <Text>{navigation.state.params.deck.title}</Text>
                <Text>{`${navigation.state.params.deck.numCards} cards`}</Text>
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

const mapStateToProps = ({ cards }) => ({
    cards
})

const mapDispatchToProps = {
    fetchCardsFromDeck
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards)
