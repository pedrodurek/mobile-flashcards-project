import { Dimensions } from 'react-native'
import styled from 'styled-components'

export const Container = styled.View`
    flex: 1;
    backgroundColor: #43A047;
    height: 100%;
    padding: ${props => props.padding ? '20px' : '0'};
    alignItems: ${props => props.center ? 'center' : 'flex-start'};
`

export const Content = styled.View`
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

export const H3 = styled.Text`
    fontSize: 18px;
    fontWeight: bold;
    color: rgba(255, 255, 255, 0.7);
`

export const ItemSeparator = styled.View`
    height: 2;
    width: 100%;
    backgroundColor: rgba(255, 255, 255, 0.7);
`

export const Input = styled.TextInput`
    borderRadius: 10px;
    padding: 15px;
    marginBottom: 20px;
    background-color: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.7);
    width: 100%;
    fontSize: 18;
    fontWeight: bold;
`
export const Card = styled.View`
    flex: 1;
    backgroundColor: ${props => props.color || '#fff'};
    alignItems: center;
    borderRadius: 10px;
    width: ${Dimensions.get('window').width - 55};
    shadow-offset: 0px 1px;
    shadow-opacity: 0.67;
    shadow-radius: 4;
    shadow-color: #000;

`