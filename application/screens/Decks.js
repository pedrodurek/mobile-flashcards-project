import React, { Component } from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks, deleteDeck } from '@actions/decks'
import { Container, H1, H2, H3, ItemSeparator, SwipButton } from '@styles'
import Swipeable from 'react-native-swipeable'
import { confirmAlert } from '@helper'
import { darkRed, grey } from '@colors'

class Decks extends Component {
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
            handleConfirm: () => {
                this.props.deleteDeck(title)
                this.state.currentSwipeable.recenter()
            },
            handleCancel: () => this.state.currentSwipeable.recenter()
        })
    }

    handleSwipOpen = (event, gestureState, swipeable, item) => {
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
            color={darkRed}
            onPress={() => this.handleRemoveDeck(this.state.currentDeck)}
        >
            <H3>Remove</H3>
        </SwipButton>
    ]

    renderDeck = ({ item }) => (
        <Swipeable
            rightButtons={this.rightButtons}
            rightButtonWidth={100}
            onRightButtonsOpenRelease={(event, gestureState, swipeable) =>
                this.handleSwipOpen(event, gestureState, swipeable, item)
            }
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
        if (decks.length > 0) {
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
        return (
            <Container padding center>
                <View style={{ marginTop: 50 }}>
                    <H1>There is no decks available</H1>
                </View>
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
