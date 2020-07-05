const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String },
    mobile :{type :Number},
    user_id:{type: String},
    house:{type: String},
    street:{type: String},
    landmark:{type: String},
    area:{type: String},
    city:{type: String},
    district:{type: String},
    state:{type: String},
    pin:{type: Number},
    status:{type:String},
    saveAs:{type:String}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Address', schema);