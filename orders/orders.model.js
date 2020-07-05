const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    product_id:{type: String},
    quantity:{type: Number},
    price:{type: String},
    user_id:{type: String},
    address_id:{type: String},
    payment_id:{type: String},
    payment_request_id:{type: String},
    status:{type:String},
    orderTime:{ type: Date, default: Date.now},
    orderId:{type:String}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Orders', schema);