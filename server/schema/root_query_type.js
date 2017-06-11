const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const ClientType = require('./client_type');
const TransactionType = require('./transaction_type');
const Transaction = mongoose.model('transaction');
const Client = mongoose.model('client');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    clients: {
      type: new GraphQLList(ClientType),
      resolve() {
        return Client.find({});
      }
    },
    client: {
      type: ClientType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Client.findById(id);
      }
    },
    transaction: {
      type: TransactionType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { id }) {
        return Transaction.findById(id);
      }
    },
     transactions: {
      type: TransactionType,
      resolve() {
        return Transaction.find({});
      }
    }
  })
});

module.exports = RootQuery;
