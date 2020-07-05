const express = require('express');
const router = express.Router();
const userService = require('./users.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.post('/addCart', addCart);
router.post('/getCart', getCart);
router.post('/removefromCart', removefromCart);
router.post('/saveAddress', saveAddress);
router.post('/getAddress', getAddress);
router.post('/saveProfileData', saveProfileData);
router.post('/editAddress', editAddress);
router.post('/removeAddress', removeAddress);
router.post('/getMyOrders', getMyOrders);
router.post('/contactUs', contactUs);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    req.body.status = 'Active';
    req.body.roles = ['user'];
    req.body.cart = [];
    userService.create(req.body)
        .then((user) => res.json(user))
        .catch(err => next(err));
}

function addCart(req, res, next) {
    userService.addCart(req.body)
        .then((data) => res.send(data))
        .catch(err => next(err));
}

function getCart(req, res, next) {
    userService.getCart(req.body)
        .then((data) => res.send(data))
        .catch(err => next(err));
}

function removefromCart(req, res, next) {
    userService.removefromCart(req.body)
        .then(data => res.send(data))
        .catch(err => next(err));
}

function saveAddress(req, res, next) {
    userService.saveAddress(req.body)
        .then(data => res.send(data))
        .catch(err => next(err));
}

function getAddress(req, res, next) {
    userService.getAddress(req.body)
        .then(data => res.send(data))
        .catch(err => next(err));
}

function saveProfileData(req, res, next) {
    userService.saveProfileData(req.body)
        .then(data => res.send(data))
        .catch(err => next(err));
}

function editAddress(req, res, next) {
    userService.editAddress(req.body)
        .then(data => res.send(data))
        .catch(err => next(err));
}

function removeAddress(req, res, next) {
    userService.removeAddress(req.body)
        .then(data => res.send(data))
        .catch(err => next(err));
}

function getMyOrders(req, res, next) {
    userService.getMyOrders(req.body)
        .then(data => res.send(data))
        .catch(err => next(err));
}

function contactUs(req, res, next) {
    userService.contactUs(req.body)
        .then(data => res.send(data))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}