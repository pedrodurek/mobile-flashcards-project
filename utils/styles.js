import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'

export const Container = styled.View`
    flex: 1;
    backgroundColor: #43A047;
    height: 100%;
    padding: ${props => props.padding ? '20px' : '0'};
    alignItems: ${props => props.center ? 'center' : 'flex-start'};
`

export const H1 = styled.Text`
    fontSize: 25px;
    fontWeight: bold;
    textAlign: center;
    color: rgba(255, 255, 255, 0.7);
`

export const H2 = styled.Text`
    fontSize: 20px;
    fontWeight: bold;
    textAlign: center;
    color: rgba(255, 255, 255, 0.7);
`

export const ItemSeparator = () => (
    <View
        style={{
            height: 2,
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.7)'
        }}
    />
)