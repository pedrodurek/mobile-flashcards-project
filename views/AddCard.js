import React, { Component } from 'react'
import { View, Alert } from 'react-native'
import { connect } from 'react-redux'
import HeaderCards from '@components/HeaderCards'
import Button from '@components/Button'
import { addCard } from '@actions/cards'
import { incrementCards } from '@actions/decks'
import { Container, Input, H1 } from '@styles'
import { white } from '@colors'


class AddEditCard extends Component {
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
                <H1 mgTop="40px">Enter with your question and answer</H1>
                <Input
                    style={{marginTop: 50}}
                    value={question}
                    placeholder="Enter with the question"
                    onChangeText={this.handleQuestion}
                    placeholderTextColor={white} 
                />
                <Input
                    value={answer}
                    placeholder="Enter with the answer"
                    onChangeText={this.handleAnswer}
                    placeholderTextColor={white} 
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

export default connect(null, mapDispatchToProps)(AddEditCard)
