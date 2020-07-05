const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Prescription = db.Prescriptions;

module.exports = {
    saveFile,
    getPrescription
};

async function saveFile(data, name, auth) {
   
    const newImage = new Prescription({
        imageName: name,
        imageData: data.imageData,
        userName: auth.name,
        mobile:auth.mobile
    });

    return await newImage.save()
        .then((result) => {
           return result
        })
        .catch((err) =>  err);
}

async function getPrescription(){

    return await Prescription.findOne()
        .then((result) => {
           return result
        })
        .catch((err) =>  err);
}