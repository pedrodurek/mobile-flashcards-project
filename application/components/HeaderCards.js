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
    <Header style={{ backgroundColor: '#1F5768' }}>
        {navigation ? (
            <Left>
                <Button transparent onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                </Button>
            </Left>
        ) : (
            <Left />
        )}
        <Body>
            <Title style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{title}</Title>
        </Body>
        <Right />
    </Header>
)

HeaderCards.propTypes = {}

HeaderCards.defaultProps = {}

export default HeaderCards
