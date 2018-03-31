import React, { Component } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks, deleteDeck } from '@actions/decks'
import HeaderCards from '@components/HeaderCards'
import { Container, H2, H3, ItemSeparator, SwipButton } from '@styles'
import Swipeable from 'react-native-swipeable'
import { confirmAlert } from '@helper'
import { redDark, grey } from '@colors'

class Decks extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: <HeaderCards title={'Decks'} navigation={navigation} />
    })

    state = {
        currentSwipeable: null,
        currentDeck: null
    }

    componentDidMount() {
        this.props.fetchDecks()
    }

    resetStates = () => {
        this.setState({ currentSwipeable: null, currentDeck: null })
    }

    handleUpdateList() {
        if (this.state.currentSwipeable) {
            this.state.currentSwipeable.recenter()
        }
        this.resetStates()
    }

    handleEditDeck = ({ title }) => {
        this.handleUpdateList()
        this.props.navigation.navigate('NewEditDeck', { title })
    }

    handleRemoveDeck = ({ title }) => {
        confirmAlert({
            title: 'Remove Deck',
            text: 'Are you sure you want to remove this deck?',
            handleConfirm: () => this.props.deleteDeck(title),
            handleCancel: () => this.state.currentSwipeable.recenter()
        })
    }

    handleSwipOpen = (event, gestureState, swipeable) => {
        if (
            this.state.currentSwipeable &&
            this.state.currentSwipeable !== swipeable
        ) {
            this.state.currentSwipeable.recenter()
        }
        this.setState({
            currentSwipeable: swipeable,
            currentDeck: item
        })
    }

    rightButtons = [
        <SwipButton
            color={grey}
            onPress={() => this.handleEditDeck(this.state.currentDeck)}
        >
            <H3>Rename</H3>
        </SwipButton>,
        <SwipButton
            color={redDark}
            onPress={() => this.handleRemoveDeck(this.state.currentDeck)}
        >
            <H3>Remove</H3>
        </SwipButton>
    ]

    renderDeck = ({ item }) => (
        <Swipeable
            rightButtons={this.rightButtons}
            rightButtonWidth={100}
            onRightButtonsOpenRelease={this.handleSwipOpen}
            onRightButtonsCloseRelease={this.resetStates}
        >
            <TouchableOpacity
                onPress={() => this.showDeck(item.title)}
                style={{ paddingVertical: 30 }}
            >
                <H2>{item.title}</H2>
                <H2>{`${item.numCards} cards`}</H2>
            </TouchableOpacity>
        </Swipeable>
    )

    showDeck = (title) => {
        if (this.state.currentSwipeable) {
            this.state.currentSwipeable.recenter()
            this.setState({
                currentSwipeable: null
            })
        } else {
            this.props.navigation.navigate('DeckView', { title })
        }
    }

    render() {
        const { decks } = this.props
        return (
            <Container>
                <ItemSeparator />
                <FlatList
                    style={{ width: '100%' }}
                    data={decks}
                    extraData={decks}
                    renderItem={this.renderDeck}
                    ItemSeparatorComponent={ItemSeparator}
                    keyExtractor={(item, index) => index}
                    ListFooterComponent={ItemSeparator}
                />
            </Container>
        )
    }
}

const mapStateToProps = ({ decks }) => ({
    decks
})

const mapDispatchToProps = {
    fetchDecks,
    deleteDeck
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)
