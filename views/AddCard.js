import React, {Component} from 'react'
import { View, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'

class AddCard extends Component {

    submit = () => {}

    render() {
        return (
            <View>
                <TextInput value={} placeholder="Enter with the question" />
                <TextInput value={} placeholder="Enter with the answer" />
                <TouchableOpacity onPress={this.submit}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)