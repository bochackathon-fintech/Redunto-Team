import './style/style.css'
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import App from './component/App'
import ClientList from './component/ClientList'
import ClientCreate from './component/ClientCreate'
import ClientDetails from './component/ClientDetails'

const client = new ApolloClient({
  dataIdFromObject: o => o.id
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
       <Router history={hashHistory} >
         <Route path="/" component={App}>
          <IndexRoute component={ClientList} />
          <Route path="/clients/new" component={ClientCreate} />
          <Route path="/clients/:id" component={ClientDetails} />
         </Route>
       </Router>
    </ApolloProvider>
    )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
