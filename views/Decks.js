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
import { fetchDecks } from '@actions/decks'
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
        currentlyOpenSwipeable: null
    }

    componentDidMount() {
        this.props.fetchDecks()
    }

    rightButtons = [
        <TouchableHighlight
            style={{
                backgroundColor: '#999',
                height: '100%',
                justifyContent: 'center',
                paddingLeft: 15
            }}
            onPress={() => Alert.alert('Teste')}
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
            onPress={() => Alert.alert('Teste2')}
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
                    this.state.currentlyOpenSwipeable &&
                    this.state.currentlyOpenSwipeable !== swipeable
                ) {
                    this.state.currentlyOpenSwipeable.recenter()
                }
                this.setState({
                    currentlyOpenSwipeable: swipeable
                })
            }}
            onRightButtonsCloseRelease={() =>
                this.setState({
                    currentlyOpenSwipeable: null
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
        if (this.state.currentlyOpenSwipeable) {
            this.state.currentlyOpenSwipeable.recenter()
            this.setState({
                currentlyOpenSwipeable: null
            })
            console.log('Teste')
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
                    renderItem={this.renderDeck}
                    ItemSeparatorComponent={ItemSeparator}
                    keyExtractor={(item) => item.title}
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
    fetchDecks
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)
