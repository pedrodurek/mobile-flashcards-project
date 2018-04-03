import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { fetchCardsFromDeck } from '@actions/cards'
import { Container, H1 } from '@styles'
import Button from '@components/Button'
import { navOptions } from '@routes'

class DeckView extends PureComponent {
    static navigationOptions = ({ navigation }) =>
        navOptions(navigation.state.params.title)

    addCard = () =>
        this.props.navigation.navigate('AddEditCard', {
            title: this.props.deck.title
        })

    startQuiz = () =>
        this.props.navigation.navigate('Quiz', { title: this.props.deck.title })

    render() {
        const { deck } = this.props
        return (
            <Container padding center>
                <View style={{ margin: 60 }}>
                    <H1>{deck.title}</H1>
                    <H1>{`${deck.numCards} cards`}</H1>
                </View>
                <Button onPress={this.addCard}>Add Card</Button>
                {deck.numCards > 0 && (
                    <Button style={{ marginTop: 20 }} onPress={this.startQuiz}>
                        Start Quiz
                    </Button>
                )}
            </Container>
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
