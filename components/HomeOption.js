import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import styled from 'styled-components'
import { H2 } from '@styles'
import { white } from '@colors'

const ContentOption = styled.View`
    flex-direction: row;
    margin: 40px 0;
    align-items: center;
`
const Icon = styled.View`
    margin: 0 40px 0 20px;
`

const ButtonOption = styled.TouchableOpacity`
    background-color: ${(props) => props.color || white};
    width: 100%;
`

const HomeOption = ({ title, icon, color, handle }) => (
    <ButtonOption color={color} onPress={handle}>
        <ContentOption>
            <Icon>
                <MaterialIcons name={icon} size={35} color={white} />
            </Icon>
            <View>
                <H2>{title}</H2>
            </View>
        </ContentOption>
    </ButtonOption>
)

HomeOption.propTypes = {}

HomeOption.defaultProps = {
    color: 'black'
}

export default HomeOption
