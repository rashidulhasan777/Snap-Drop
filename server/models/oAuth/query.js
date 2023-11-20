const axios = require('axios');
const User = require('../user/user.model');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

const getGoogleAccessCode = async(data)=>{
    const { code } = data;
    const url = new URL('https://oauth2.googleapis.com/token');
    url.searchParams.append('client_id', process.env.GOOGLE_CLIENT_ID);
    url.searchParams.append('client_secret', process.env.GOOGLE_CLIENT_SECRET);
    url.searchParams.append('code', code);
    url.searchParams.append('grant_type', 'authorization_code');
    url.searchParams.append('redirect_uri', `${process.env.BASE_FRONTEND_URL}/oauth_google`);
    try {
      const access_token = await axios.post(url.toString(), {})
      return access_token;
    } catch (error) {
      console.log(error.response);
    }
}
const getFbAccessCode = async(data)=>{
  const { code } = data;
  const url = new URL('https://graph.facebook.com/oauth/access_token');
  url.searchParams.append('client_id', process.env.FB_CLIENT_ID);
  url.searchParams.append('client_secret', process.env.FB_CLIENT_SECRET);
  url.searchParams.append('code', code);
  url.searchParams.append(
    'redirect_uri',
    `${process.env.BASE_FRONTEND_URL}/oauth_fb`
  );
  try {
    const access_token = await axios.post(url.toString(), {});
    return access_token;
  } catch (error) {
    console.log(error);
  }
}
const oAuthLogin = async(data)=>{
    const { email, name, profilePic } = data;
    try {
      let existingUser = await User.findOne({ email });
      if (!existingUser) {
        existingUser = await User.create({
          email,
          profilePic,
          name,
        });
      }
      const access_token = jwt.sign({ _id: existingUser._id }, SECRET_KEY);
      return access_token;
    } catch (error) {
      console.log(error);
    }
}

module.exports = {
    getGoogleAccessCode,
    getFbAccessCode,
    oAuthLogin
}