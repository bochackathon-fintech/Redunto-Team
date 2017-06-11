import React, {Component} from 'react'
import {Text, View} from 'react-native'
import {Button} from 'react-native-elements'


class Welcome extends Component {

  render() {
    return (
      <View style={{
        flex: 1,
        paddingLeft: 0,
        paddingRight: 0,
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      >
        <Text style={{fontSize: 32, textAlign: 'center'}}> Payment</Text>
        <Text style={{fontSize: 18, textAlign: 'center', marginTop: 20}}> Company One</Text>
        <Text style={{fontSize: 18, textAlign: 'center', marginTop: 20}}> Eur 200</Text>
        <View style={{flex:0, flexDirection: 'row', marginTop: 20, width: '100%', justifyContent: 'space-between'}}>
          <Button
            title="Reject"
            buttonStyle={{backgroundColor: '#e74c3c', width: 150}}
          />
          <Button
            title="Accept"
            buttonStyle={{backgroundColor: '#3498db', width: 150}}
          />
        </View>

      </View>
    )
  }
}

export default Welcome
