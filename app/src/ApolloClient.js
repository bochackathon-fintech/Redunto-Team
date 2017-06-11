import {ApolloClient} from 'react-apollo'
import {createNetworkInterface} from 'apollo-client'
const networkInterface = createNetworkInterface({uri: '/graphql'})


export default new ApolloClient({
  networkInterface,
})
