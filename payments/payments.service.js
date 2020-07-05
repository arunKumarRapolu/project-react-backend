const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Users = db.Users;
const Orders = db.Orders;

module.exports = {
    saveTransaction
};

async function saveTransaction(req) {
    let orderId = await generateOrderId(7);
  let orderArr = [];
  req.products.forEach((item) => {
      let orderObj = {
        product_id:item.id,
        quantity: item.quantity,
        price: item.price,
        user_id:req.user_id,
        address_id: req.address_id,
        payment_id: req.payment_id,
        payment_request_id: req.payment_request_id,
        status: 'Pending',
        orderId: orderId
      }
      orderArr.push(orderObj);
  });

  let isSave = await Orders.insertMany(orderArr);
  if(isSave){
      if(req.fromCart == true){
            const isUpdate = await Users.updateOne({_id:req.user_id},{$set:{cart:[]}});
            if(isUpdate){
                const user = await Users.find({_id:req.user_id});
                return user[0];
            }
      }
      else{
        const user = await Users.find({_id:req.user_id});
        return user[0];
      }
  }
}

async function generateOrderId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let checkOrder = await Orders.find({order_id:result});
    if(checkOrder.length == 0)
    return result;
    else
    generateOrderId(7);
 }

// async function getAll() {
//     return await User.find().select('-hash');
// }

