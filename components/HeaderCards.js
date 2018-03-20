import React from 'react'
import PropTypes from 'prop-types'
import {
    Header,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Title,
    Text
} from 'native-base'

const HeaderCards = ({ title, navigation }) => (
    <Header>
        {navigation ? (
            <Left>
                <Button transparent onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" />
                </Button>
            </Left>
        ) : (
            <Left />
        )}
        <Body>
            <Title>{title}</Title>
        </Body>
        <Right />
    </Header>
)

HeaderCards.propTypes = {}

HeaderCards.defaultProps = {}

export default HeaderCards
