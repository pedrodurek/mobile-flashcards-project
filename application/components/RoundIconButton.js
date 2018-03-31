import React from 'react'
import { View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { white } from '@colors'

const RoundButton = styled.TouchableOpacity`
    margin: 30px;
    padding: ${props => props.padding || '10px'};
    background-color: '${white}';
    border-radius: 30px;
`

const RoundIconButton = ({ onPress, color, name, size, padding }) => (
    <View>
        <RoundButton onPress={onPress} padding={padding}>
            <FontAwesome name={name} color={color} size={size} />
        </RoundButton>
    </View>
)

RoundIconButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    padding: PropTypes.string
}

export default RoundIconButton
