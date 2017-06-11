const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const TransactionType = require('./transaction_type');
const Client = mongoose.model('client');

const ClientType = new GraphQLObjectType({
  name:  'ClientType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    transactions: {
      type: new GraphQLList(TransactionType),
      resolve(parentValue) {
        return Client.findTransactions(parentValue.id);
      }
    }
  })
});

module.exports = ClientType;
