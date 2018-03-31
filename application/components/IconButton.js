import React from 'react'
import { TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import { white } from '@colors'

const IconButton = ({ name, onPress }) => (
    <TouchableOpacity onPress={onPress} style={{alignSelf: 'flex-end'}}>
        <MaterialIcons name={name} size={35} color={white} />
    </TouchableOpacity>
)

IconButton.propTypes = {
     name: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
}

export default IconButton
