import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, ActionSheetIOS } from 'react-native'
import {
    fetchCardsFromDeck,
    fetchFavoriteCards,
    deleteCard,
    _deleteCard,
    editCard
} from '@actions/cards'
import { decrementCards } from '@actions/decks'
import FlipCard from 'react-native-flip-card'
import { Container, ItemSeparator, Card, H1, H2, Badge } from '@styles'
import ProgressBar from '@components/ProgressBar'
import RoundIconButton from '@components/RoundIconButton'
import HeaderCard from '@components/HeaderCard'
import Button from '@components/Button'
import { purple, darkGreen, green, red } from '@colors'
import styled from 'styled-components'
import {
    confirmAlert,
    enableLocalNotification,
    disableLocalNotification
} from '@helper'

const Buttons = styled.View`
    flex-direction: row;
    margin-top: 20;
`

class Quiz extends Component {
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

    resetNotification = () => {
        disableLocalNotification().then(enableLocalNotification)
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
        this.resetNotification()
        this.setState({ indexCards: 0, countCorrect: 0 })
    }

    handleDelete = (title, id) => {
        this.props
            .deleteCard(title, id)
            .then(() => this.props.decrementCards(title))
    }

    handleEdit = () => {
        const { navigation: { navigate }, cards } = this.props
        const { isFavorite } = this.props.navigation.state.params
        const card = cards[this.state.indexCards]
        const { title, id } = card
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Cancel', 'Edit', 'Remove'],
                destructiveButtonIndex: 2,
                cancelButtonIndex: 0
            },
            (buttonIndex) => {
                if (buttonIndex === 1) {
                    navigate('AddEditCard', { card, title })
                } else if (buttonIndex === 2) {
                    confirmAlert({
                        title: 'Remove Card',
                        text: 'Are you sure do want to remove this card?',
                        handleConfirm: () => this.handleDelete(title, id)
                    })
                }
            }
        )
    }

    handleFavorite = () => {
        const { indexCards } = this.state
        const { isFavorite } = this.props.navigation.state.params
        const card = this.props.cards[indexCards]
        const { title, ...rest } = card
        this.props
            .editCard(title, { ...rest, favorite: !card.favorite })
            .then(() => {
                if (isFavorite) {
                    this.props._deleteCard(card.id)
                }
            })
    }
    
    handleBack = () => {
        this.resetNotification()
        this.props.navigation.goBack()
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
                                <ItemSeparator style={{ marginTop: 20 }} />
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
                                <ItemSeparator style={{ marginTop: 20 }} />
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
                        <Badge mgTop="60px" mgBottom="20px">
                            <H2>{`${percenCorrect} %`}</H2>
                        </Badge>
                        <Badge mgBottom="20px">
                            <H2>{`Cards: ${cards.length}`}</H2>
                        </Badge>
                        <Badge mgBottom="20px">
                            <H2>{`Hits: ${countCorrect}`}</H2>
                        </Badge>
                        <Button
                            style={{ marginBottom: 20 }}
                            onPress={this.handleReset}
                        >
                            Restart
                        </Button>
                        <Button onPress={this.handleBack}>Back to Deck</Button>
                    </View>
                ) : (
                    <View style={{ marginTop: 50 }}>
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
    _deleteCard,
    editCard
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
