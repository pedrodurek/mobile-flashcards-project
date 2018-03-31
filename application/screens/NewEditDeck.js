import React, { Component } from 'react'
import { connect } from 'react-redux'
import HeaderCards from '@components/HeaderCards'
import Button from '@components/Button'
import { Container, H1, Input } from '@styles'
import { addDeck, renameDeck } from '@actions/decks'
import { simpleAlert } from '@helper'

class NewEditDeck extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: <HeaderCards title={'New Deck'} navigation={navigation} />
    })

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
                this.props.navigation.popToTop()
            })
        } else {
            this.props.addDeck(this.state.title).then(() => {
                this.setState({ title: '' })
                simpleAlert('Deck Created')
                this.props.navigation.popToTop()
            })
        }
    }

    handleChange = (title) => this.setState({ title })

    render() {
        const { title } = this.state
        return (
            <Container padding center>
                <H1 mgTop="40px">What is the title of your new deck?</H1>
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

const mapDispatchToProps = {
    addDeck,
    renameDeck
}

export default connect(null, mapDispatchToProps)(NewEditDeck)
