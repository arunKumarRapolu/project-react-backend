const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name:{type: String},
    mobile:{type: Number},
    email:{type: String},
    message:{type: String},
    time:{ type: Date, default: Date.now}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('ContactUS', schema);