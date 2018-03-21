import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import HomeOption from '../components/HomeOption'

class Home extends Component {
	render() {
		const { navigate } = this.props.navigation
		return (
			<View>
				<HomeOption
					title="New Deck"
					icon="add-circle-outline"
					handle={() => navigate('NewDeck')}
				/>
				<HomeOption
					title="Decks"
					icon="collections"
					handle={() => navigate('Decks')}
				/>
				<HomeOption title="Favourites" icon="star-border" />
			</View>
		)
	}
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
