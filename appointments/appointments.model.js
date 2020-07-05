const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user_id: { type: String},
    doctor_id: { type: String},
    fee:{ type: String},
    createdDate: { type: Date, default: Date.now },
    appointmentTIme:{type: Date},
    status:{type:String}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Appointments', schema);