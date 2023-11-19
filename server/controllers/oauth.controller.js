const axios = require('axios');
const User = require('../models/user/user.model');
const jwt = require('jsonwebtoken');
const { getGoogleAccessCode, getFbAccessCode, oAuthLogin } = require('../models/oAuth/query');
const SECRET_KEY = process.env.JWT_SECRET;

const googleAccessCode = async (req, res, next) => {
  try {
    const access_token = await getGoogleAccessCode(req.body);
    res.status(200);
    res.send({ access_token: access_token.data.access_token });
  } catch (error) {
    res.status(500);
    res.send({ errorMessage: 'Something went wrong' });
  }
};

const fbAccessCode = async (req, res, next) => {
  try {
    const access_token = await getFbAccessCode(req.body)
    res.status(200);
    res.send({ access_token: access_token.data.access_token });
  } catch (error) {
    res.status(500);
    res.send({ errorMessage: 'Something went wrong' });
  }
};

const oauthLogin = async (req, res, next) => {
  try {
    const access_token = await oAuthLogin(req.body)
    res.status(201).send({ access_token });
  } catch (error) {
    res.status(500).send({ errorMessage: 'Something went wrong' });
  }
};

module.exports = { googleAccessCode, fbAccessCode, oauthLogin };
