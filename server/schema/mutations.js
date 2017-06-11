const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Client = mongoose.model('client');
const Transaction = mongoose.model('transaction');
const ClientType = require('./client_type');
const TransactionType = require('./transaction_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addClient: {
      type: ClientType,
      args: {
        title: { type: GraphQLString }
      },
      resolve(parentValue, { title }) {
        return (new Client({ title })).save()
      }
    },
    addTransactionToClient: {
      type: ClientType,
      args: {
        content: { type: GraphQLString },
        clientId: { type: GraphQLID }
      },
      resolve(parentValue, { content, clientId }) {
        return Client.addTransaction(clientId, content);
      }
    },
    statusTransaction: {
      type: TransactionType,
      args: { id: { type: GraphQLID }, status: { type: GraphQLString } },
      resolve(parentValue, { id, status }) {
        return Transaction.status(id, status);
      }
    },
    deleteClient: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Client.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;
