import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { white, transWhite, darkGreen } from '@colors'
import { Span } from '@styles'
import styled from 'styled-components'

const Percentage = styled.View`
    background-color: ${darkGreen};
    width: ${(props) => `${props.percentage}%`};
    border-radius: 10px;
    padding-top: 3px;
    padding-bottom: 3px;
`
const Bar = styled.View`
    border-radius: 10px;
    border-color: ${white};
    background-color: ${transWhite};
`

const ProgressBar = ({ value, percentage }) => (
    <Bar>
        <Percentage percentage={percentage}>
            <Span>{value}</Span>
        </Percentage>
    </Bar>
)

ProgressBar.propTypes = {}

ProgressBar.defaultProps = {}

export default ProgressBar
