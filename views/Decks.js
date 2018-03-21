import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks } from '../actions/decks'
import HeaderCards from '../components/HeaderCards'

class Decks extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: <HeaderCards title={'Decks'} />
    })
    componentDidMount() {
        this.props.fetchDecks()
    }

    renderDeck = ({ item }) => (
        <TouchableOpacity onPress={() => this.showDeck(item.title)}>
            <Text>{item.title}</Text>
            <Text>{`${item.numCards} cards`}</Text>
        </TouchableOpacity>
    )

    showDeck = (title) => this.props.navigation.navigate('DeckView', { title })

    render() {
        const { decks } = this.props
        return (
            <View>
                <FlatList
                    data={decks}
                    renderItem={this.renderDeck}
                    keyExtractor={(item) => item.title}
                />
            </View>
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
