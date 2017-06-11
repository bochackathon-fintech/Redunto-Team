const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: 'client'
  },
  status: { type: String },
  content: { type: String }
});

TransactionSchema.statics.status = function(id, status ) {
  const Transaction = mongoose.model('transaction');

  return Transaction.findById(id)
    .then(transaction => {
      transaction.status = status;
      return transaction.save();
    })
}

mongoose.model('transaction', TransactionSchema);
