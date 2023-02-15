const jwt = require('jsonwebtoken');

const PRIVATE_KEY = 'my-super-secret';

const generateToken = (user) => jwt.sign(user, PRIVATE_KEY, { expiresIn: '1m' });

const verifyToken = (token) => jwt.verify(token, PRIVATE_KEY);

module.exports = { generateToken, verifyToken };
