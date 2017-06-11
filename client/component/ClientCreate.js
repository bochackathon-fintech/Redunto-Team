import React, {Component} from 'react'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import { Link, hashHistory } from 'react-router'
import fetchClients from '../queries/fetchClients'
class ClientCreate extends Component{
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

        return(
            <div>
            <Link to="/" >back </Link>
            <h3> Create Client</h3>

            <form onSubmit={this.onSubmit.bind(this)}>
            <label>Client Name</label>
            <input
            onChange={event => this.setState({title: event.target.value})}
            value={this.state.title}
            />
            </form>
            </div>
        )
    }

}

const mutation = gql`
mutation addClient($title: String){
  addClient(title:$title){
    id
    title
  }
}
`

export default graphql(mutation)(ClientCreate)