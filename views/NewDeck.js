import React, { Component } from 'react'
import { Alert, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import HeaderCards from '@components/HeaderCards'
import { Text, Item, Input } from 'native-base'
import { Container, H1 } from '@styles'
import { addDeck } from '@actions/decks'
import styled from 'styled-components'

const InputRonded = styled.TextInput`
    borderRadius: 10px;
    padding: 15px;
    marginBottom: 25px;
    marginTop: 40px;
    background-color: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.7);
    width: 100%;
    fontSize: 18;
    fontWeight: bold;
`
const Button = styled.TouchableOpacity`
    borderRadius: 10px;
    padding: 15px;
    background-color: #1F5768;
`

const Span = styled.Text`
    color: rgba(255, 255, 255, 0.7);
    fontSize: 18;
    fontWeight: bold;
    textAlign: center;
`

const StyledView = styled.View`
    width: 100%;
    marginRight: 10px;
    marginLeft: 10px;
    marginBottom: 20px;
`

class NewDeck extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: <HeaderCards title={'New Deck'} navigation={navigation} />
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
            <Container padding center>
                <View>
                    <H1 style={{marginTop: 40}}>What is the title of your new deck?</H1>
                </View>
                <StyledView>
                    <InputRonded
                        placeholderTextColor="rgba(255, 255, 255, 0.7)" 
                        value={title}
                        placeholder="Deck Title"
                        onChangeText={this.handleChange}
                    />
                </StyledView>
                <View style={{width: 150}}>
                    <Button onPress={this.submit}>
                        <Span>Submit</Span>
                    </Button>
                </View>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
    addDeck
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)
