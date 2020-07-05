const express = require('express');
const router = express.Router();
const doctorService = require('./doctors.service');

// routes
router.get('/getDoctors', getDoctors);

module.exports = router;

function getDoctors(req, res, next) {
    doctorService.getDoctors()
        .then(data => res.send(data))
        .catch(err => next(err));
}