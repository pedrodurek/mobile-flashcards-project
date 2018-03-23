import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledButton = styled.TouchableOpacity`
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

const Button = ({ onPress, children, style }) => (
    <View style={[style, {width: 150}]}>
        <StyledButton onPress={onPress}>
            <Span>{children}</Span>
        </StyledButton>
    </View>
)

Button.propTypes = {
}

Button.defaultProps = {
}

export default Button