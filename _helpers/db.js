const config = require('config.json');
const mongoose = require('mongoose');
console.log(process.env);
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

module.exports = {
    Users: require('../users/users.model'),
    Prescriptions: require('../prescriptions/prescriptions.model'),
    Products: require('../products/products.model'),
    Address: require('../addresses/address.model'),
    Doctors: require('../doctors/doctors.model'),
    Orders: require('../orders/orders.model'),
    Appointments: require('../appointments/appointments.model'),
    ContactUs: require('../contactUs/contactUs.model')
};