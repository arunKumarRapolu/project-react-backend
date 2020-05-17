const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;

module.exports = {
    authenticate
};

async function authenticate({ userId, amount }) {
  
}

// async function getAll() {
//     return await User.find().select('-hash');
// }

