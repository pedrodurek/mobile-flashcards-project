import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    TouchableOpacity,
    ActionSheetIOS,
    Alert
} from 'react-native'
import HeaderCards from '@components/HeaderCards'
import {
    fetchCardsFromDeck,
    fetchFavoriteCards,
    deleteCard,
    editCard
} from '@actions/cards'
import { decrementCards } from '@actions/decks'
import FlipCard from 'react-native-flip-card'
import { Container, Card, H1, H2, H3, Badge } from '@styles'
import ProgressBar from '@components/ProgressBar'
import RoundIconButton from '@components/RoundIconButton'
import HeaderCard from '@components/HeaderCard'
import Button from '@components/Button'
import { purple, darkGreen, green, red } from '@colors'
import styled from 'styled-components'

const Buttons = styled.View`
    flex-direction: row;
    margin-top: 20;
`

class Quiz extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: <HeaderCards title={'Quiz'} navigation={navigation} />
    })

    state = {
        indexCards: 0,
        countCorrect: 0
    }

    componentDidMount() {
        const { title, isFavorite } = this.props.navigation.state.params
        if (isFavorite) {
            this.props.fetchFavoriteCards()
        } else {
            this.props.fetchCardsFromDeck(title)
        }
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

    handleReset = () => {
        this.setState({ indexCards: 0, countCorrect: 0 })
    }

    handleEdit = () => {
        const { navigation: { navigate }, cards } = this.props
        const { isFavorite } = this.props.navigation.state.params
        const { indexCards } = this.state
        const card = cards[indexCards]
        const { title, index } = card
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Cancel', 'Edit', 'Remove'],
                destructiveButtonIndex: 2,
                cancelButtonIndex: 0
            },
            (buttonIndex) => {
                if (buttonIndex === 1) {
                    navigate('AddEditCard', {
                        card,
                        index: indexCards,
                        title
                    })
                } else if (buttonIndex === 2) {
                    Alert.alert(
                        'Remove Card',
                        'Are you sure do want to remove this card?',
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel'
                            },
                            {
                                text: 'OK',
                                onPress: () =>
                                    this.props
                                        .deleteCard(title, indexCards)
                                        .then(() =>
                                            this.props.decrementCards(title)
                                        )
                            }
                        ],
                        { cancelable: false }
                    )
                }
            }
        )
    }

    handleFavorite = () => {
        const { indexCards } = this.state
        const card = this.props.cards[indexCards]
        const { title, question, answer } = card
        this.props.editCard(title, indexCards, {
            question,
            answer,
            favorite: !card.favorite
        })
    }

    render() {
        const { indexCards, countCorrect } = this.state
        const { cards } = this.props
        const percenCorrect = (countCorrect / cards.length * 100).toFixed(2)
        const percenDone = ((indexCards + 1) / cards.length * 100).toFixed(2)
        return (
            <Container padding center>
                {indexCards < cards.length ? (
                    <View style={{ height: '95%' }}>
                        <ProgressBar
                            value={`${indexCards + 1}/${cards.length}`}
                            percentage={percenDone}
                        />
                        <FlipCard
                            flipHorizontal={true}
                            flipVertical={false}
                            style={{ borderWidth: 0, marginTop: 10 }}
                        >
                            <Card padding color={darkGreen}>
                                <HeaderCard
                                    handleEdit={this.handleEdit}
                                    handleFavorite={this.handleFavorite}
                                    isFavorite={cards[indexCards].favorite}
                                    title="Answer"
                                />
                                <H1 mgTop="80px" mgBottom="20px">
                                    {cards[indexCards].question}
                                </H1>
                            </Card>
                            <Card padding color={purple}>
                                <HeaderCard
                                    handleEdit={this.handleEdit}
                                    handleFavorite={this.handleFavorite}
                                    isFavorite={cards[indexCards].favorite}
                                    title="Question"
                                />
                                <H1 mgTop="80px" mgBottom="20px">
                                    {cards[indexCards].answer}
                                </H1>
                                <Buttons>
                                    <RoundIconButton
                                        name="check"
                                        color={green}
                                        size={30}
                                        onPress={this.handleCorrect}
                                    />
                                    <RoundIconButton
                                        name="close"
                                        color={red}
                                        size={30}
                                        padding="10px 13px"
                                        onPress={this.handleIncorrect}
                                    />
                                </Buttons>
                            </Card>
                        </FlipCard>
                    </View>
                ) : cards.length > 0 ? (
                    <View>
                        <Badge mgTop="80px" mgBottom="20px">
                            <H2>{`${percenCorrect} %`}</H2>
                        </Badge>
                        <Badge mgBottom="20px">
                            <H2>{`Cards: ${cards.length}`}</H2>
                        </Badge>
                        <Badge mgBottom="20px">
                            <H2>{`Hits: ${countCorrect}`}</H2>
                        </Badge>
                        <Button onPress={this.handleReset}>Restart</Button>
                    </View>
                ) : (
                    <View style={{marginTop: 50}}>
                        <H1>There is no cards available</H1>
                    </View>
                )}
            </Container>
        )
    }
}

const mapStateToProps = ({ cards }) => ({
    cards
})

const mapDispatchToProps = {
    fetchCardsFromDeck,
    fetchFavoriteCards,
    decrementCards,
    deleteCard,
    editCard
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
