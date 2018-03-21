import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Container,
    Content,
    Card,
    CardItem,
    Text,
    Body,
    Button
} from 'native-base'
import HeaderCards from '../components/HeaderCards'
import { fetchCardsFromDeck } from '../actions/cards'
import FlipCard from 'react-native-flip-card'

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
        console.log(cards)
        return (
            <Container>
                {indexCards < cards.length ? (
                    <Content>
                        <Text>{`${indexCards + 1}/${cards.length}`}</Text>
                        <FlipCard flipHorizontal={true} flipVertical={false}>
                            <Card>
                                <CardItem>
                                    <Body>
                                        <Text>
                                            {cards[indexCards].question}
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card>
                                <CardItem>
                                    <Body>
                                        <Text>{cards[indexCards].answer}</Text>
                                        <Button
                                            success
                                            onPress={this.handleCorrect}
                                        >
                                            <Text>Correct</Text>
                                        </Button>
                                        <Button
                                            danger
                                            onPress={this.handleIncorrect}
                                        >
                                            <Text>Incorrect</Text>
                                        </Button>
                                    </Body>
                                </CardItem>
                            </Card>
                        </FlipCard>
                    </Content>
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
