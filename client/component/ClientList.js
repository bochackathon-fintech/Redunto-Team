import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router'
import fetchClients from '../queries/fetchClients'

class ClientList extends Component{
    onClientDelete(id){
        this.props.mutate({
            variables:{id},
        })
        .then(()=> this.props.data.refetch())

    }
    renderClients(){
        return this.props.data.clients.map(({title ,id }) =>{
            return(
                <li key={id} className="collection-item">
                <Link to={`/clients/${id}`}>
                   {title}
                 </Link>

                <i
                className="material-icons"
                onClick={()=> this.onClientDelete(id)}
                >
                delete
                </i>
                </li>
            )
        })

    }

    render(){
        console.log(this.props)
        const { data: {loading}} = this.props
        console.log(loading)
        if(loading){
            return <div> loading </div>
        }
        return(
            <div>
            <h3>Client List</h3>
            <ul className="collection">{this.renderClients()}</ul>
            <Link
            to="/clients/new"
            className="btn-floating btn-large red right"
            >
            <i className="material-icons"> add</i>
            </Link>
            </div>
        )
    }

}


const mutation = gql`
mutation deletClient($id: ID){
  deleteClient(id:$id){
    id
  }
}
`


export default graphql(mutation)(graphql(fetchClients)(ClientList))