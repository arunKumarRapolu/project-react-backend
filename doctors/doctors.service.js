const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { resolve } = require('url');
const Users = db.Users;
const Products = db.Products;
const Address = db.Address;
const Orders = db.Orders;
const ContactUs = db.ContactUs;
const Doctors = db.Doctors;

module.exports = {
    getDoctors
};

async function getDoctors() {
    let getAllDoctors = await Doctors.find({status:'Active'});
    if(getAllDoctors){
        return getAllDoctors;
    }
}