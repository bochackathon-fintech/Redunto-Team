const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  transactions: [{
    type: Schema.Types.ObjectId,
    ref: 'transaction'
  }]
});

ClientSchema.statics.addTransaction = function(id, content) {
  const Transaction = mongoose.model('transaction');

  return this.findById(id)
    .then(client => {
      const transaction = new Transaction({ content, client })
      client.transactions.push(transaction)
      return Promise.all([transaction.save(), client.save()])
        .then(([transaction, client]) => client);
    });
}

ClientSchema.statics.findTransactions = function(id) {
  return this.findById(id)
    .populate('transactions')
    .then(client => client.transactions);
}

mongoose.model('client', ClientSchema);
