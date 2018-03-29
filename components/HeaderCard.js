import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import IconButton from '@components/IconButton'
import { orange } from '@colors'
import { H3 } from '@styles'

const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`

const HeaderCard = ({ title, handleEdit }) => (
    <Header>
        <IconButton name="edit" onPress={handleEdit} />
        <View style={{ marginTop: 10 }}>
            <H3 color={orange}>{title}</H3>
        </View>
        <IconButton name="star" />
    </Header>
)

HeaderCard.propTypes = {}

HeaderCard.defaultProps = {}

export default HeaderCard
