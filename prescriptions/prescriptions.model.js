const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var ImageSchema = new Schema({
    imageName: {type: String,required: true},
    imageData: {type: String,required: true},
    userName:{type: String},
    uploadedDate:{type: Date, default: Date.now},
    mobile:{type:Number}
});

var Prescription = mongoose.model('Prescriptions', ImageSchema);

module.exports = Prescription;