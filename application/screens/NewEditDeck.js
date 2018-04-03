import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from '@components/Button'
import { Container, H1, Input } from '@styles'
import { addDeck, renameDeck } from '@actions/decks'
import { simpleAlert } from '@helper'
import { navOptions } from '@routes'
import { white } from '@colors'

class NewEditDeck extends PureComponent {
    static navigationOptions = ({ navigation }) =>
        navOptions(navigation.state.params ? 'Edit Deck' : 'New Deck')

    state = {
        title: '',
        oldTitle: ''
    }

    componentDidMount() {
        const { params } = this.props.navigation.state
        if (params) {
            const { title } = params
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
                simpleAlert('Deck Updated')
                this.goToDeckView(title)
            })
        } else {
            this.props.addDeck(this.state.title).then(() => {
                this.setState({ title: '' })
                simpleAlert('Deck Created')
                this.goToDeckView(title)
            })
        }
    }

    goToDeckView = (title) => {
        this.props.navigation.dispatch({
            routeName: 'Decks',
            type: 'ReplaceCurrentScreen'
        })
        this.props.navigation.navigate('DeckView', { title })
    }

    handleChange = (title) => this.setState({ title })

    render() {
        const { title } = this.state
        return (
            <Container padding center>
                <H1 mgTop="40px">What is the title of your new deck?</H1>
                <Input
                    style={{ marginTop: 30 }}
                    placeholderTextColor={white}
                    value={title}
                    placeholder="Deck Title"
                    onChangeText={this.handleChange}
                />
                <Button onPress={this.submit}>Submit</Button>
            </Container>
        )
    }
}

const mapDispatchToProps = {
    addDeck,
    renameDeck
}

export default connect(null, mapDispatchToProps)(NewEditDeck)
