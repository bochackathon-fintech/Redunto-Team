import React, {PropTypes} from 'react'
import {Text} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
}

const TabIcon = (props) => (
  <Text
    style={{color: props.selected ? 'red' : 'black'}}
  >
    <Icon name={props.iconName} size={30} color={props.selected ? '#ff4d4d' : '#939fb1'} style={{padding: 20}} />
  </Text>
)

TabIcon.propTypes = propTypes

export default TabIcon
