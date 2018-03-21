import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Content, Card, CardItem, Text } from 'native-base'
import HeaderCards from '../components/HeaderCards'
import { fetchCardsFromDeck } from '../actions/cards'
import FlipCard from 'react-native-flip-card'

class Quiz extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: <HeaderCards title={'Quiz'} navigation={navigation} />
    })

    state = {
        indexCards: 0
    }

    componentDidMount() {
        this.props.fetchCardsFromDeck(this.props.navigation.state.params.title)
    }

    render() {
        const { indexCards } = this.state
        const { cards } = this.props
        console.log(cards)
        return (
            <Container>
                <Content>
                    <Text>{`${indexCards+1}/${cards.length}`}</Text>
                    {cards.length > 0 ? (
                        <FlipCard>
                            <Card>
                                <Text>{cards[indexCards].question}</Text>
                            </Card>
                            <Card>
                                <Text>{cards[indexCards].answer}</Text>
                            </Card>
                        </FlipCard>
                    ) : (
                        <Text>There is no cards for this deck</Text>
                    )}
                </Content>
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
