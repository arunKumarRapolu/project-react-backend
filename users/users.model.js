const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true },
    mobile :{type :Number, required: true},
    email: { type: String, required: true },
    password:{ type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    cart:{type:Array, default:[]},
    roles:{type:Array, default:['user']},
    status:{type:String}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Users', schema);