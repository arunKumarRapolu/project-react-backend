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
    addDoctor
};

async function addDoctor(data) {
    let getAdmin = await Users.find({_id:data.user_id});
    if(getAdmin[0].roles.indexOf('admin') >= 0){
        delete data.user_id;
        const doctor = new Doctors(data);
        let isSave = await doctor.save();
        if(isSave){
            let res = {
                type:'success',
                message:'Saved Successfully !'
            }
            return res;
        }
    }
    else{
        let res = {
            type:'error',
            message : 'You are not Authorised !'
        }
        throw res;
    }
}