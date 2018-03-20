import React, {Component} from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

class Quiz extends Component {
    render() {
        return (
            <View></View>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)