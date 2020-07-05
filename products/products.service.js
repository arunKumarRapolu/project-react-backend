const db = require('_helpers/db');
const Products = db.Products;

module.exports = {
    addProduct,
    getProducts,
    getProductDetails
};

async function addProduct(data) {
    const product = new Products(data);
    const isSave = await product.save();
    if(isSave){
        return 'success'
    } 
}

async function getProducts() {
    const data = await Products.find({status:"Active"});
    if(data){
        return data
    }
}

async function getProductDetails(id) {
    const data = await Products.find({_id:id});
    if(data){
        return data
    }
}