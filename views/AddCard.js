import React, { Component } from 'react'
import { View, Alert } from 'react-native'
import { connect } from 'react-redux'
import HeaderCards from '@components/HeaderCards'
import Button from '@components/Button'
import { addCard } from '@actions/cards'
import { incrementCards } from '@actions/decks'
import { Container, Input, H1 } from '@styles'


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
            <Container padding center>
                <H1 style={{marginTop: 40}}>Enter with your question and answer</H1>
                <Input
                    style={{marginTop: 50}}
                    value={question}
                    placeholder="Enter with the question"
                    onChangeText={this.handleQuestion}
                    placeholderTextColor="rgba(255, 255, 255, 0.7)" 
                />
                <Input
                    value={answer}
                    placeholder="Enter with the answer"
                    onChangeText={this.handleAnswer}
                    placeholderTextColor="rgba(255, 255, 255, 0.7)" 
                />
                <Button onPress={this.submit}>Submit</Button>
            </Container>
        )
    }
}

const mapDispatchToProps = {
    addCard,
    incrementCards
}

export default connect(null, mapDispatchToProps)(AddCard)
