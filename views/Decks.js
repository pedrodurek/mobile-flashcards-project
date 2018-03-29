import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableHighlight,
    TouchableOpacity,
    Alert
} from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks, deleteDeck } from '@actions/decks'
import HeaderCards from '@components/HeaderCards'
import { Container, H2, H3, ItemSeparator } from '@styles'
import styled from 'styled-components'
import Swipeable from 'react-native-swipeable'
import { Feather } from '@expo/vector-icons'

const ViewButton = styled.View`
    padding: 30px 0;
`

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

    handleUpdateList() {
        if (this.state.currentSwipeable) {
            this.state.currentSwipeable.recenter()
            this.setState({ currentSwipeable: null, currentDeck: null })
        }
    }

    handleEditDeck = ({ title }) => {
        this.handleUpdateList()
        this.props.navigation.navigate('NewEditDeck', { title })
    }

    handleRemoveDeck = ({ title }) => {
        Alert.alert(
            'Remove Deck',
            'Are you sure you want to remove this deck?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () =>
                        this.state.currentSwipeable.recenter()
                },
                {
                    text: 'OK',
                    onPress: () => this.props.deleteDeck(title)
                }
            ]
        )
    }

    rightButtons = [
        <TouchableHighlight
            style={{
                backgroundColor: '#999',
                height: '100%',
                justifyContent: 'center',
                paddingLeft: 15
            }}
            onPress={() => this.handleEditDeck(this.state.currentDeck)}
        >
            <View>
                <H3>Rename</H3>
            </View>
        </TouchableHighlight>,
        <TouchableHighlight
            style={{
                backgroundColor: '#D11606',
                height: '100%',
                justifyContent: 'center',
                paddingLeft: 15
            }}
            onPress={() => this.handleRemoveDeck(this.state.currentDeck)}
        >
            <H3>Remove</H3>
        </TouchableHighlight>
    ]

    renderDeck = ({ item }) => (
        <Swipeable
            rightButtons={this.rightButtons}
            rightButtonWidth={100}
            onRightButtonsOpenRelease={(event, gestureState, swipeable) => {
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
            }}
            onRightButtonsCloseRelease={() =>
                this.setState({
                    currentSwipeable: null,
                    currentDeck: null
                })
            }
        >
            <TouchableOpacity
                onPress={() => this.showDeck(item.title)}
                style={{ paddingTop: 30, paddingBottom: 30 }}
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
