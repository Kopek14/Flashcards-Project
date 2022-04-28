const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.verifyUserToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token)
    return res.status(401).send('Access Denied / Unauthorized request');

  try {
    token = token.split(' ')[1]; // Remove Bearer from string

    if (token === 'null' || !token)
      return res.status(401).send('Unauthorized request');

    let verifiedUser = jwt.verify(token, 'shhhhh'); // config.TOKEN_SECRET => 'secretKey'
    if (!verifiedUser) return res.status(401).send('Unauthorized request');

    req.user = verifiedUser;
    // id & user_type_id
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send('Invalid Token');
  }
};

module.exports.IsUser = async (req, res, next) => {
  if (req.user.user_type_id === 0) {
    next();
  }
  return res.status(401).send('Unauthorized!');
};
module.exports.IsAdmin = async (req, res, next) => {
  if (req.user.user_type_id === 1) {
    next();
  }
  return res.status(401).send('Unauthorized!');
};

module.exports.IsOwnByUser = (req, res, next) => {};

module.exports.userEvent = async (req, res, next) => {
  res.send('Event dla uzytkownikow');
};

module.exports.adminEvent = async (req, res, next) => {
  res.send('Event dla adminow');
};

module.exports.verifyUserTokenReload = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token)
    return res.status(401).send('Access Denied / Unauthorized request');

  try {
    token = token.split(' ')[1]; // Remove Bearer from string

    if (token === 'null' || !token)
      return res.status(401).send('Unauthorized request');

    let verifiedUser = jwt.verify(token, 'shhhhh'); // config.TOKEN_SECRET => 'secretKey'
    if (!verifiedUser) return res.status(401).send('Unauthorized request');

    req.user = verifiedUser;
    // id & user_type_id
    res.status(200).send(req.user);
  } catch (error) {
    console.log(error);
    res.status(400).send('Invalid Token');
  }
};
