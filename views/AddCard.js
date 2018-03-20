import React, { Component } from 'react'
import { View } from 'react-native'
import { Input, Item, Button, Text } from 'native-base'
import { connect } from 'react-redux'
import HeaderCards from '../components/HeaderCards'

class AddCard extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: (
            <HeaderCards
                title={'Add Card'}
                navigation={navigation}
            />
        )
    })

    submit = () => {}

    render() {
        return (
            <View>
                <Item regular>
                    <Input placeholder="Enter with the question" />
                </Item>
                <Item regular>
                    <Input placeholder="Enter with the answer" />
                </Item>
                <Button onPress={this.submit}>
                    <Text>Submit</Text>
                </Button>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)
