import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import PropTypes from 'prop-types'

const CardsStatusBar = ({ backgroundColor, ...props }) => (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
)

CardsStatusBar.propTypes = {
}

CardsStatusBar.defaultProps = {
}

export default CardsStatusBar