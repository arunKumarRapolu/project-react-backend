const express = require('express');
const router = express.Router();
const adminService = require('./admin.service');

// routes
router.post('/addDoctor', addDoctor);

module.exports = router;

function addDoctor(req, res, next) {
    adminService.addDoctor(req.body)
        .then((data) => res.send(data))
        .catch(err => next(err));
}