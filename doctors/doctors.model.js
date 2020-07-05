const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String},
    designation: {type: String},
    qualification:{type: String},
    experience: {type: String},
    description:{type: String},
    address:{type: String},
    status:{type:String},
    img:{type: String},
    fee:{type: Number}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Doctors', schema);