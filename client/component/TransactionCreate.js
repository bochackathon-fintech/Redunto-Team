import React, {Component} from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

class TransactionCreate extends Component{
    constructor(props){
        super(props)
        this.state = { content: ''}
    }

    onSubmit(event){
        event.preventDefault()
       this.props.mutate({
           variables:{
               content:this.state.content,
               clientId: this.props.clientId
           }
       })
       .then(()=> this.setState({content: ''}))

    }

    render(){
        return(
           <form onSubmit={this.onSubmit.bind(this)}>
           <label> Create Transaction</label>
           <input
             value={this.state.content}
             onChange={event => this.setState({content: event.target.value})}
           />
           </form>
        )
    }

}

const mutation = gql`
mutation addTransactionToClient($content: String, $clientId:ID){
  addTransactionToClient(content: $content, clientId: $clientId){
    id
    transactions{
        id
      content
      status
    }
  }
}
`

export default graphql(mutation)(TransactionCreate)