import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '@components/Button'
import { addCard, editCard } from '@actions/cards'
import { incrementCards } from '@actions/decks'
import { ContainerKeyboard, Container, Input, H1 } from '@styles'
import { white, green } from '@colors'
import { simpleAlert } from '@helper'
import { navOptions } from '@routes'

class AddEditCard extends PureComponent {
    static navigationOptions = ({ navigation }) =>
        navOptions(navigation.state.params.card ? 'Edit Card' : 'Add Card')

    state = {
        question: '',
        answer: '',
        editCard: false
    }

    componentDidMount() {
        const { card } = this.props.navigation.state.params
        if (card) {
            const { question, answer } = card
            this.setState({ question, answer, editCard: true })
        }
    }

    handleQuestion = (question) => this.setState({ question })

    handleAnswer = (answer) => this.setState({ answer })

    submit = () => {
        const { question, answer, editCard } = this.state
        const { title, card } = this.props.navigation.state.params
        if (editCard) {
            this.props
                .editCard(title, {
                    ...card,
                    question,
                    answer
                })
                .then(() => {
                    simpleAlert('Card Updated')
                    this.setState({ question: '', answer: '' })
                    this.props.navigation.goBack()
                })
        } else {
            this.props
                .addCard(title, { question, answer, favorite: false })
                .then(() => {
                    simpleAlert('Card Added')
                    this.setState({ question: '', answer: '' })
                    this.props.incrementCards(title)
                    this.props.navigation.goBack()
                })
        }
    }

    render() {
        const { question, answer } = this.state
        return (
            <KeyboardAwareScrollView style={{ backgroundColor: green }}>
                <Container padding center>
                    <H1 mgTop="40px">Enter with your question and answer</H1>
                    <Input
                        style={{ marginTop: 50 }}
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
            </KeyboardAwareScrollView>
        )
    }
}

const mapDispatchToProps = {
    addCard,
    incrementCards,
    editCard
}

export default connect(null, mapDispatchToProps)(AddEditCard)
