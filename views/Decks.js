import React, {Component} from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks } from '../actions/cards'

class Decks extends Component {
    componentDidMount() {
        this.props.fetchDecks()
    }

    renderDeck = ({ item }) => (
        <View></View>
    )

    render() {
        const { decks } = this.props
        return (
            <View>
                <FlatList data={decks} renderItem={this.renderDeck}/>
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