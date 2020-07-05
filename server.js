require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '15mb' }
));
app.use(cors());

// use JWT auth to secure the api
//app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/payment', require('./payments/payments.controller'));
app.use('/prescription', require('./prescriptions/prescriptions.controller'));
app.use('/product', require('./products/products.controller'));
app.use('/admin', require('./admin/admin.controller'));
app.use('/doctor', require('./doctors/doctors.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
