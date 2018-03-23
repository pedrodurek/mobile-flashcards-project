import React, { Component } from 'react'
import { View, Text, FlatList, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks } from '@actions/decks'
import HeaderCards from '@components/HeaderCards'
import { Container, H2, ItemSeparator } from '@styles'
import styled from 'styled-components'
import Swipeable from 'react-native-swipeable'
import Feather from '@expo/vector-icons'

const ViewButton = styled.View`
	padding: 30px 0;
`


class Decks extends Component {
	static navigationOptions = ({ navigation }) => ({
		header: <HeaderCards title={'Decks'} navigation={navigation} />
	})
	componentDidMount() {
		this.props.fetchDecks()
	}

    rightButtons = [
        <TouchableHighlight>
            <Feather name="edit" size={30} />
            <H2>Rename</H2>
        </TouchableHighlight>,
        <TouchableHighlight>
            <Feather name="trash-2" size={30} />
            <H2>Remove</H2>
        </TouchableHighlight>
    ]

	renderDeck = ({ item }) => (
		<ViewButton>
			<Swipeable
				onPress={() => this.showDeck(item.title)}
				rightButtons={rightButtons}
			>
				<H2>{item.title}</H2>
				<H2>{`${item.numCards} cards`}</H2>
			</Swipeable>
		</ViewButton>
	)

	showDeck = (title) => this.props.navigation.navigate('DeckView', { title })

	render() {
		const { decks } = this.props
		return (
			<Container>
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
