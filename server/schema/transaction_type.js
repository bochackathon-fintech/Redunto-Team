const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Transaction = mongoose.model('transaction');

const TransactionType = new GraphQLObjectType({
  name:  'TransactionType',
  fields: () => ({
    id: { type: GraphQLID },
    status: { type: GraphQLInt },
    content: { type: GraphQLString },
    client: {
      type: require('./client_type'),
      resolve(parentValue) {
        return Transaction.findById(parentValue).populate('client')
          .then(transaction => {
            console.log(transaction)
            return transaction.client
          });
      }
    }
  })
});

module.exports = TransactionType;
