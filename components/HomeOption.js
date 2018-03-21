import React from 'react'
import PropTypes from 'prop-types'
import { MaterialIcons } from '@expo/vector-icons'

const HomeOption = ({ title, icon, color, handle }) => (
	<View>
		<TouchableOpacity onPress={handle}>
			<View>
				<MaterialIcons name={icon} />
			</View>
			<Text>{title}</Text>
		</TouchableOpacity>
	</View>
)

HomeOption.propTypes = {}

HomeOption.defaultProps = {}

export default HomeOption
