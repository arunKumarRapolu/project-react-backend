const express = require('express');
const router = express.Router();
const productService = require('./products.service');

router.post('/addProduct', addProduct);
router.get('/getProducts', getProducts);
router.post('/getProductDetails', getProductDetails);

module.exports = router;

function addProduct(req, res, next) {
    req.body.status = 'Active';
    productService.addProduct(req.body)
        .then(() => res.json({message:"Product added successfully"}))
        .catch(err => next(err));
}

function getProducts(req, res, next) {
    req.body.status = 'Active';
    productService.getProducts()
        .then((data) => res.json(data))
        .catch(err => next(err));
}

function getProductDetails(req, res, next) {
    productService.getProductDetails(req.body.id)
        .then((data) => res.json(data))
        .catch(err => next(err));
}