import gql from 'graphql-tag'

export default gql`
query ClientQuiery($id: ID!){
  client(id:$id){
    id
    title
    transactions{
      content
      id
      status
    }
  }
}
`