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
import { fetchCardsFromDeck, deleteCard } from '@actions/cards'
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

    handleReset = () => {
        this.setState({ indexCards: 0, countCorrect: 0 })
    }

    handleEdit = (card, index) => {
        const { title } = this.props.navigation.state.params
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Cancel', 'Edit', 'Remove'],
                destructiveButtonIndex: 2,
                cancelButtonIndex: 0
            },
            (buttonIndex) => {
                if (buttonIndex === 1) {
                    this.props.navigation.navigate('AddEditCard', {
                        card,
                        index,
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
                                        .deleteCard(title, index)
                                        .then(() => {
                                            this.props.decrementCards(title)
                                        })
                            }
                        ],
                        { cancelable: false }
                    )
                }
            }
        )
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
                                    handleEdit={() =>
                                        this.handleEdit(
                                            cards[indexCards],
                                            indexCards
                                        )
                                    }
                                    title="Answer"
                                />
                                <H1 mgTop="80px" mgBottom="20px">
                                    {cards[indexCards].question}
                                </H1>
                            </Card>
                            <Card padding color={purple}>
                                <HeaderCard title="Question" />
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
                ) : (
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
    decrementCards,
    deleteCard
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
