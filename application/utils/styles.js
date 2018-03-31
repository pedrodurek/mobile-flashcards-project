import { Dimensions } from 'react-native'
import styled from 'styled-components'
import { green, white, transWhite, darkGreen } from '@colors'

export const Container = styled.View`
    flex: 1;
    background-color: ${green};
    height: 100%;
    padding: ${(props) => (props.padding ? '20px' : '0')};
    align-items: ${(props) => (props.center ? 'center' : 'flex-start')};
`

export const Content = styled.View`
    flex: 1;
    padding: ${(props) => (props.padding ? '20px' : '0')};
`

export const Text = styled.Text`
    font-weight: bold;
    text-align: center;
    color: ${white};
`

export const H1 = Text.extend`
    font-size: 25px;
    margin-top: ${(props) => props.mgTop || '0px'};
    margin-bottom: ${(props) => props.mgBottom || '0px'};
`

export const H2 = Text.extend`
    font-size: 20px;
`

export const H3 = styled.Text`
    font-size: 18px;
    font-weight: bold;
    text-align: ${(props) => (props.center ? 'center' : 'justify')};
    color: ${(props) => props.color || white};
`

export const Span = Text.extend`
    fontSize: 11;
`

export const ItemSeparator = styled.View`
    height: 2;
    width: 100%;
    background-color: ${white};
`

export const Input = styled.TextInput`
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 20px;
    background-color: ${transWhite};
    color: ${white};
    width: 100%;
    font-size: 18;
    font-weight: bold;
`

export const Badge = styled.View`
    border-radius: 30px;
    padding: 10px 0px;
    margin-top: ${(props) => props.mgTop || '0px'};
    margin-bottom: ${(props) => props.mgBottom || '0px'};
    background-color: ${darkGreen};
`

export const Card = styled.View`
    flex: 1;
    background-color: ${(props) => props.color || white};
    align-items: center;
    border-radius: 10px;
    width: ${Dimensions.get('window').width - 55};
    shadow-offset: 0px 1px;
    shadow-opacity: 0.67;
    shadow-radius: 2;
    shadow-color: #000;
    padding: ${(props) => (props.padding ? '20px' : '0')};
`

export const SwipButton = styled.TouchableHighlight`
    background-color: ${(props) => props.color || white};
    height: 100%;
    justify-content: center;
    padding-left: 15px;
`