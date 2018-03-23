import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import styled from 'styled-components'

const ContainerBtn = styled.View`
    flexDirection: row;
    margin: 40px 0;
	alignItems: center;
`
const Icon = styled.View`
    margin: 0 40px 0 20px;
`
const H1 = styled.Text`
    fontSize: 20px;
    color: rgba(255, 255, 255, 0.7);
    fontWeight: bold;
`

const HomeOption = ({ title, icon, color, handle }) => (
    <TouchableOpacity style={{ backgroundColor: color }} onPress={handle}>
        <ContainerBtn>
            <Icon>
                <MaterialIcons name={icon} size={35} color="rgba(255, 255, 255, 0.7)" />
            </Icon>
            <View>
                <H1>{title}</H1>
            </View>
        </ContainerBtn>
    </TouchableOpacity>
)

HomeOption.propTypes = {}

HomeOption.defaultProps = {
    color: 'black'
}

export default HomeOption
