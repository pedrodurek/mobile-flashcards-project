import React, { Component } from 'react'
import { View, Alert } from 'react-native'
import { Input, Item, Button, Text } from 'native-base'
import { connect } from 'react-redux'
import HeaderCards from '../components/HeaderCards'
import { addCard } from '../actions/cards'

class AddCard extends Component {
	static navigationOptions = ({ navigation }) => ({
		header: <HeaderCards title={'Add Card'} navigation={navigation} />
	})

	state = {
		question: '',
		answer: ''
	}

	handleQuestion = (question) => this.setState({ question })

	handleAnswer = (answer) => this.setState({ answer })

	submit = () => {
		const { question, answer } = this.state
		this.props
			.addCard(this.props.navigation.state.params.title, {
				question,
				answer
			})
			.then(() => {
				Alert.alert('Card added!')
				this.setState({ question: '', answer: '' })
				this.props.navigation.goBack()
			})
	}

	render() {
		return (
			<View>
				<Item regular>
					<Input
						value={question}
						placeholder="Enter with the question"
						onChangeText={this.handleQuestion}
					/>
				</Item>
				<Item regular>
					<Input
						value={answer}
						placeholder="Enter with the answer"
						onChangeText={this.handleAnswer}
					/>
				</Item>
				<Button onPress={this.submit}>
					<Text>Submit</Text>
				</Button>
			</View>
		)
	}
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
	addCard
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
