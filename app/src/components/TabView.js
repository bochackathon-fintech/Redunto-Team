import React, {PropTypes} from 'react'
import {StyleSheet, ScrollView, View} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {List, ListItem, Text} from 'react-native-elements'


const contextTypes = {
  drawer: React.PropTypes.object,
}

const propTypes = {
  name: PropTypes.string,
  sceneStyle: View.propTypes.style,
  title: PropTypes.string,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: '#d4dcdf',
    borderRightWidth: 1,
    paddingTop: 40,
  },
})

const TabView = (props, context) => {
  const drawer = context.drawer

  const list = [
    {
      name: 'home',
      icon: 'home',
      action: (drawer) => {
        drawer.close()
        Actions.dashboard()
      },
    },
  ]
  return (
    <ScrollView style={[styles.container, props.sceneStyle]}>
      <List containerStyle={{flex: 1, width: '100%'}}>
        {
    list.map((l, i) => (
      <ListItem
        roundAvatar
        leftIcon={{name: l.icon}}
        onPress={() => l.action(drawer)}
        key={i}
        title={l.name}
      />
    ))
  }
      </List>
    </ScrollView>
  )
}

TabView.contextTypes = contextTypes
TabView.propTypes = propTypes

export default TabView
