import React, {Component} from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import { Link, hashHistory } from 'react-router'
import fetchClient from '../queries/fetchClient'
import TransactionCreate from './TransactionCreate'
import TransactionList from './TransactionList'
class ClientDetails extends Component{
   constructor(props){
       super(props)
       this.state = { title: ''}
   }
   onSubmit(event){
      event.preventDefault()
      this.props.mutate({
          variables:{
              title: this.state.title
          },
          refetchQueries:[{query: fetchClients}],
      }).then(()=> hashHistory.push('/'))
   }
    render(){
        console.log(this.props)
       const {client} = this.props.data
        if(!client){
            return <div> </div>
        }
        return(
            <div>
            <Link to="/" >back </Link>
            <h3> {client.title}</h3>
            <TransactionList transaction={client.transactions} />
            <TransactionCreate clientId={this.props.params.id} />
            </div>
        )
    }

}


export default graphql(fetchClient,{
    options: (props) => {return {variables:{id: props.params.id}}}
})(ClientDetails)