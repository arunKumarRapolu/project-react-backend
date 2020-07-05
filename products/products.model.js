const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String},
    type: {type: String},
    sheetQuantity: {type: String},
    price:{type: Number},
    company:{type: String},
    img:{type: String},
    description:{type: String},
    ingradients:{type: String},
    directions:{type : String},
    status:{type:String}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Products', schema);