import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

class Cards extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title
    })

    render() {
        return <View />
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Cards)
