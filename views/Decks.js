import React, { Component } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks } from '../actions/decks'

class Decks extends Component {
    componentDidMount() {
        this.props.fetchDecks()
    }

    renderDeck = ({ item }) => (
        <TouchableOpacity>
            <Text>{item.title}</Text>
            <Text>{`${item.numCards} cards`}</Text>
        </TouchableOpacity>
    )

    render() {
        const { decks } = this.props
        console.log(decks)
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
