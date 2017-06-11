import Expo, {Notifications} from 'expo'
import React, {Component} from 'react'
import {Alert} from 'react-native'
import {createStore, applyMiddleware} from 'redux'
import {ApolloProvider} from 'react-apollo'
import ReduxThunk from 'redux-thunk'
import reducers from './src/reducers'
import Router from './src/Router'
import client from './src/ApolloClient'
import registerForNotifications from './src/services/pushNotifications'

//import Alerts from './components/higherOrderComponents/Alerts'
//import {config} from './config'

const store = createStore(
  reducers,
  {}, // initial state
  applyMiddleware(ReduxThunk),
)


class App extends Component {
  componentDidMount() {
    registerForNotifications()
    Notifications.addListener((notification) => {
      const {data: {text}, origin} = notification
      if (origin === 'received' && text) {
        Alert.alert(
          'New Payment',
          text,
          [{text: 'Ok.'}],
        )
      }
    })

  }
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <Router />
      </ApolloProvider>
    )
  }
}


Expo.registerRootComponent(App)
