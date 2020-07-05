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

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    addCart,
    getCart,
    removefromCart,
    saveAddress,
    getAddress,
    saveProfileData,
    editAddress,
    removeAddress,
    getMyOrders,
    contactUs
};

async function authenticate({ username, password }) {
    const user = await Users.findOne({ mobile: username });
    // if (user && bcrypt.compareSync(password, user.hash)) {
    //     const { hash, ...userWithoutHash } = user.toObject();
    //     const token = jwt.sign({ sub: user.id }, config.secret);
    //     return {
    //         ...userWithoutHash,
    //         token
    //     };
    // }
    if(user && password == user.password){
        return user;
    }
}

async function getAll() {
    return await Users.find().select('-hash');
}

async function getById(id) {
    return await Users.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    if (await Users.findOne({ mobile: userParam.mobile })) {
        throw 'Mobile number "' + userParam.mobile + '" is already exists';
    }

    const user = new Users(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user

    const isSave = await user.save();

    if(isSave){
        const newUser = await Users.findOne({mobile:userParam.mobile});
        return newUser
    }
    
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.name !== userParam.name && await User.findOne({ username: userParam.name })) {
        throw 'Username "' + userParam.name + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

async function addCart(data) {
    const isUpdate = await Users.updateOne({_id:data.userId},{$push:{cart:data.productId}});

    if(isUpdate){
        return {message:'success'};
    }
}

async function getCart(data) {
    const searchProducts = await Products.find({_id:data.id});
    if(searchProducts){
        
        return searchProducts;
    }
}

async function removefromCart(req) {
    const isUpdate = await Users.updateOne({_id:req.userId},{$pull:{cart:req.cartId}});
    if(isUpdate){
        return {message:'success'};
    }
}

async function saveAddress(req) {
    const address = new Address(req);
    const isSave = await address.save();
    if(isSave){
        const addresses = await Address.find({user_id:req.user_id});
        if(addresses){
            return addresses;
        }
    }
}

async function getAddress(req) {
    const addresses = await Address.find({user_id:req.user_id,status:'Active'});
    if(addresses){
        return addresses;
    }
}

async function saveProfileData(req) {
    const foundEmail = await Users.find({email:req.email, _id:{$ne:req.user_id}});
    if(foundEmail.length > 0){
        throw 'Email "' + req.email + '" is already taken';
    }
    else if(req.old_pwd && req.new_pwd){
        const user = await Users.find({_id:req.user_id});
        if(user[0].password != req.old_pwd){
            throw 'Old password is not correct';
        }
        else{
            const updateUser = await Users.updateOne({_id:req.user_id},{$set:{name:req.name,email:req.email,password:req.new_pwd}});
            if(updateUser){
                const user = await Users.find({_id:req.user_id});
                return user[0];
            }
        }
    }
    else{
        const updateUser = await Users.updateOne({_id:req.user_id},{$set:{name:req.name,email:req.email}});
        if(updateUser){
            const user = await Users.find({_id:req.user_id});
            return user[0];
        }
    }

}

async function editAddress(req) {
    const {name,mobile,house,street,landmark,area,city,district,state,pin,saveAs,status} = req
    const isEdit = await Address.updateOne({_id:req.id},{$set:{name,mobile,house,street,landmark,area,city,district,state,pin,saveAs,status}});
    if(isEdit){
        const addresses = await Address.find({user_id:req.user_id,status:'Active'});
        return addresses;
    }
}

async function removeAddress(req) {
    const isRemove = await Address.updateOne({_id:req.id},{$set:{status:'De-Active'}});
    if(isRemove){
        const addresses = await Address.find({user_id:req.user_id,status:'Active'});
        return addresses;
    }
}

async function getMyOrders(req) {
    const ordersRecord = await Orders.find({user_id:req.user_id}).lean();
    if(ordersRecord.length > 0){
        let product_ids = [];
        let address_ids = [];
        ordersRecord.forEach(item => {
            product_ids.push(item.product_id);
            address_ids.push(item.address_id);
        });
        product_ids = [...new Set(product_ids)];
        address_ids = [...new Set(address_ids)];
        const productsInfo = await Products.find({_id:{$in:product_ids}}).lean();
        const allAddress = await Address.find({_id:{$in:address_ids}}).lean();
        if(productsInfo && allAddress){
            ordersRecord.forEach(item => {
                item.productInfo = productsInfo.filter(products => products._id == item.product_id)[0];
                item.addressInfo = allAddress.filter(address => address._id == item.address_id)[0];
            });
        }
        return ordersRecord;
    }
    else{
        return ordersRecord;
    }
}

async function contactUs(req) {
    const contactUs = new ContactUs(req);
    const isSave = await contactUs.save();
    if(isSave){
        return{message:'success'};
    }
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}

async function getProductInfo(product_id){
    let info =   await Products.find({_id:product_id}).lean();
   
        return info;
    
}