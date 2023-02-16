const { verifyToken } = require("../config/tokenHandler");

const auth = (req, res, next) => {
  const token = (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    ? req.headers.authorization.split(' ')[1]
    : undefined;

  if (!token) {
    res.json({ error: 'No hay credenciales' });
    return;
  }

  try {
    const decodedData = verifyToken(token);
    req.user = decodedData;

    next();
  } catch (err) {
    res.json({ error: 'No hay credenciales' });
    return;
  }
};

module.exports = auth;
