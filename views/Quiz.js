import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'native-base'
import { View, Text, TouchableOpacity } from 'react-native'
import HeaderCards from '@components/HeaderCards'
import { fetchCardsFromDeck } from '@actions/cards'
import FlipCard from 'react-native-flip-card'
import { Container, Card, H1 } from '@styles'
import { MaterialIcons } from '@expo/vector-icons'

class Quiz extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: <HeaderCards title={'Quiz'} navigation={navigation} />
    })

    state = {
        indexCards: 0,
        countCorrect: 0
    }

    componentDidMount() {
        this.props.fetchCardsFromDeck(this.props.navigation.state.params.title)
    }

    handleCorrect = () => {
        this.setState(({ countCorrect, indexCards }) => ({
            countCorrect: countCorrect + 1,
            indexCards: indexCards + 1
        }))
    }

    handleIncorrect = () => {
        this.setState(({ indexCards }) => ({
            indexCards: indexCards + 1
        }))
    }

    render() {
        const { indexCards, countCorrect } = this.state
        const { cards } = this.props
        return (
            <Container padding center>
                {indexCards < cards.length ? (
                    <View style={{ height: '95%' }}>
                        <Text>{`${indexCards + 1}/${cards.length}`}</Text>
                        <FlipCard
                            flipHorizontal={true}
                            flipVertical={false}
                            style={{ borderWidth: 0 }}
                        >
                            <Card color="#1F5768">
                                <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 13, marginRight: 13 }}>
                                    <MaterialIcons
                                        name="star"
                                        size={35}
                                        color="rgba(255, 255, 255, 0.7)"
                                    />
                                </TouchableOpacity>
                                <H1 style={{ marginTop: 40 }}>
                                    {cards[indexCards].question}
                                </H1>
                                <Text>Answer</Text>
                            </Card>
                            <Card color="#3059B8">
                                <H1 style={{ marginTop: 40 }}>
                                    {cards[indexCards].answer}
                                </H1>
                                <Text>Question</Text>
                                <Button success onPress={this.handleCorrect}>
                                    <Text>Correct</Text>
                                </Button>
                                <Button danger onPress={this.handleIncorrect}>
                                    <Text>Incorrect</Text>
                                </Button>
                            </Card>
                        </FlipCard>
                    </View>
                ) : (
                    <Text>
                        {`Percentage: ${(
                            countCorrect /
                            cards.length *
                            100
                        ).toFixed(2)} %`}
                    </Text>
                )}
            </Container>
        )
    }
}

const mapStateToProps = ({ cards }) => ({
    cards
})

const mapDispatchToProps = {
    fetchCardsFromDeck
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
