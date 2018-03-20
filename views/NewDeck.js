import React, { Component } from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import HeaderCards from '../components/HeaderCards'
import { Container, Content, Text, Item, Input, Button } from 'native-base'
import { addDeck } from '../actions/decks'

class NewDeck extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: <HeaderCards title={'New Deck'} />
    })

    state = {
        title: ''
    }

    submit = () => {
        this.props.addDeck(this.state.title).then(() => {
            this.setState({ title: '' })
            Alert.alert('Deck created!')
            this.props.navigation.navigate('Decks')
        })
    }

    handleChange = (title) => this.setState({ title })
    

    render() {
        const { title } = this.state
        return (
            <Container>
                <Content padder>
                    <Text>What is the title of your new deck?</Text>
                    <Item regular>
                        <Input
                            value={title}
                            placeholder="Deck Title"
                            onChangeText={this.handleChange}
                        />
                    </Item>
                    <Button onPress={this.submit}>
                        <Text>Submit</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
    addDeck
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)
