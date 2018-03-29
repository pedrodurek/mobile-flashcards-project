import React, { Component } from 'react'
import { Alert, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import HeaderCards from '@components/HeaderCards'
import Button from '@components/Button'
import { Text, Item } from 'native-base'
import { Container, H1, Input } from '@styles'
import { addDeck, renameDeck } from '@actions/decks'

class NewEditDeck extends Component {
	static navigationOptions = ({ navigation }) => ({
		header: <HeaderCards title={'New Deck'} navigation={navigation} />
	})

	state = {
		title: '',
		oldTitle: ''
    }
    
    componentDidMount() {
		if (this.props.navigation.state.params) {
			const { title } = this.props.navigation.state.params
			if (title) {
				this.setState({ title, oldTitle: title })
			}
		}
    }

	submit = () => {
		const { oldTitle, title } = this.state
		if (oldTitle) {
			this.props.renameDeck(oldTitle, title).then(() => {
				this.setState({ title: '', oldTitle: '' })
				Alert.alert('Deck updated!')
                this.props.navigation.popToTop()
			})
		} else {
			this.props.addDeck(this.state.title).then(() => {
				this.setState({ title: '' })
				Alert.alert('Deck created!')
				this.props.navigation.popToTop()
			})
		}
	}

	handleChange = (title) => this.setState({ title })

	render() {
		const { title } = this.state
		return (
			<Container padding center>
				<H1 mgTop="40px">
					What is the title of your new deck?
				</H1>
				<Input
					style={{ marginTop: 30 }}
					placeholderTextColor="rgba(255, 255, 255, 0.7)"
					value={title}
					placeholder="Deck Title"
					onChangeText={this.handleChange}
				/>
				<Button onPress={this.submit}>Submit</Button>
			</Container>
		)
	}
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
    addDeck,
    renameDeck
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEditDeck)
