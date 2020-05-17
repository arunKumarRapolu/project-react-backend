const express = require('express');
const router = express.Router();
const paymentService = require('./payments.service');
const Insta = require('instamojo-nodejs');
const url = require('url');
const querystring = require('querystring');

console.log("PAYMENT CONTROLLER")

// routes
router.post('/request', payment);
router.get('/callback', paymentCallback);
// router.get('/', getAll);

module.exports = router;

function payment(req, res, next) {
        Insta.setKeys('test_12e0249dab49958bda17182296f', 'test_9fb3b5b7fc375d39e9aff4742eb');
        const data = new Insta.PaymentData();
        Insta.isSandboxMode(true);

        data.purpose = req.body.purpose;
        data.amount = req.body.amount;
        data.buyer_name = req.body.buyer_name;
        data.redirect_url = req.body.redirect_url;
        data.email = req.body.email;
        data.phone = req.body.phone;
        data.send_email = false;
        data.webhook = 'http://www.example.com/webhook/';
        data.send_sms = false;
        data.allow_repeated_payments = false;

        Insta.createPayment(data, function(error, response) {
            if (error) {
              // some error
            } else {
              const responseData = JSON.parse(response);
              const redirectUrl = responseData.payment_request.longurl
             res.status(201).json(redirectUrl);
            }
          });
}

function paymentCallback(req,res, next) {
   let url_parts = url.parse(req.url, true);
   let responseData = url_parts.query;
   console.log(responseData);
   if(responseData.payment_id){
    //insert into database
    //send email
    //send sms
    return res.redirect('http://localhost:3000/payment_complete/?payment_id='+responseData.payment_id);
  }
}