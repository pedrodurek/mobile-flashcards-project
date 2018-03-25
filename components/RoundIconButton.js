import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
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

RoundIconButton.propTypes = {}

RoundIconButton.defaultProps = {}

export default RoundIconButton
