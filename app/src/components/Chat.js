import React, {Component} from 'react'
import {View, Text, AsyncStorage} from 'react-native'
import SocketIOClient from 'socket.io-client'
import {GiftedChat} from 'react-native-gifted-chat'
import '../UserAgent'
const USER_ID = '@userId'

export default class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      userId: null,
    }

    this.determineUser = this.determineUser.bind(this)
    this.onReceivedMessage = this.onReceivedMessage.bind(this)
    this.onSend = this.onSend.bind(this)
    this._storeMessages = this._storeMessages.bind(this)

    this.socket = SocketIOClient('192.168.0.102:4000', {
      jsonp: false,
      transports: ['websocket'],
    })
    console.log(this.socket.connected)
    this.socket.on('connect', () => {
      console.log('check 2', this.socket.connected)
    })
    this.socket.on('message', this.onReceivedMessage)
    this.determineUser()
  }

  /**
   * When a user joins the chatroom, check if they are an existing user.
   * If they aren't, then ask the server for a userId.
   * Set the userId to the component's state.
   */
  determineUser() {
    AsyncStorage.getItem(USER_ID)
      .then((userId) => {
        // If there isn't a stored userId, then fetch one from the server.
        if (!userId) {
          this.socket.emit('userJoined', null)
          this.socket.on('userJoined', (userId) => {
            AsyncStorage.setItem(USER_ID, userId)
            this.setState({userId})
          })
        } else {
          this.socket.emit('userJoined', userId)
          this.setState({userId})
        }
      })
      .catch((e) => console.log(e))
  }

  // Event listeners
  /**
   * When the server sends a message to this.
   */
  onReceivedMessage(messages) {
    console.log(messages)
    this._storeMessages(messages)
  }

  /**
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */
  onSend(messages = []) {
    this.socket.emit('message', messages[0])
    this._storeMessages(messages)
  }

  render() {
    let user = {_id: this.state.userId || -1}
    console.log(user)
    return (
      <View style={{flex: 1, marginBottom: 50}}>
        <GiftedChat
          style={{marginBottom: 100}}
          messages={this.state.messages}
          onSend={this.onSend}
          user={user}
        />
      </View>
    )
  }

  // Helper functions
  _storeMessages(messages) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      }
    })
  }
}


