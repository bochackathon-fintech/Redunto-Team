import React, {Component} from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

class TransactionList extends Component {
    onLike(id, status){
       this.props.mutate({
           variables: {id, status},
           optimisticResponse:{
               __typename:'Mutation',
               statusTransaction:{
                   id,
                   __typename: 'TransactionType',
                   status: status
               }
           }
        })
    }
    renderTransactions(){
        return this.props.transaction && this.props.transaction.map(({id, content, status}) =>{
            return (
              <li key={id} className="collection-item">
                {content}
                <div className="vote-box">
                  <i className="material-icons">access_time</i>
                </div>
              </li>
            )
        })
    }
    render(){
        return (
            <ul className="collection">
            {this.renderTransactions()}
            </ul>
        )
    }
}

const mutation = gql`
mutation StatusTransaction($id: ID, $status: String){
  StatusTransaction(id:$id, status:$status){
    id
    status
  }
}
`

export default graphql(mutation)(TransactionList)