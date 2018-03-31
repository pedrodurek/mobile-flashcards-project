import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { H3 } from '@styles'
import { darkGreen } from '@colors'

const StyledButton = styled.TouchableOpacity`
    border-radius: 10px;
    padding: 15px;
    background-color: ${darkGreen};
`

const Button = ({ onPress, children, style }) => (
    <View style={[style, { width: 150 }]}>
        <StyledButton onPress={onPress}>
            <H3 center>{children}</H3>
        </StyledButton>
    </View>
)

Button.propTypes = {}

Button.defaultProps = {}

export default Button
