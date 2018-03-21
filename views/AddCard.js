import React, { Component } from 'react'
import { View, Alert } from 'react-native'
import { Input, Item, Button, Text } from 'native-base'
import { connect } from 'react-redux'
import HeaderCards from '../components/HeaderCards'
import { addCard } from '../actions/cards'
import { incrementCards } from '../actions/decks'

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
        const { title } = this.props.navigation.state.params
        this.props.addCard(title, { question, answer }).then(() => {
            Alert.alert('Card added!')
            this.setState({ question: '', answer: '' })
            this.props.incrementCards(title)
            this.props.navigation.goBack()
        })
    }

    render() {
        const { question, answer } = this.state
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

const mapDispatchToProps = {
    addCard,
    incrementCards
}

export default connect(null, mapDispatchToProps)(AddCard)
