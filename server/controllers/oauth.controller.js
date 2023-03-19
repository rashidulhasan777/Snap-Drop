const axios = require('axios');

const googleAccessCode = async (req, res, next) => {
  const { code } = req.body;
  const url = new URL('https://oauth2.googleapis.com/token');
  url.searchParams.append('client_id', process.env.GOOGLE_CLIENT_ID);
  url.searchParams.append('client_secret', process.env.GOOGLE_CLIENT_SECRET);
  url.searchParams.append('code', code);
  url.searchParams.append('grant_type', 'authorization_code');
  url.searchParams.append('redirect_uri', 'http://localhost:4200/oauth_google');
  try {
    const access_token = await axios.post(url.toString(), {});
    res.status(200);
    res.send({ access_token: access_token.data.access_token });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ errorMessage: 'Something went wrong' });
  }
};

const fbAccessCode = async (req, res, next) => {
  const { code } = req.body;
  console.log(code);
  const url = new URL('https://graph.facebook.com/oauth/access_token');
  url.searchParams.append('client_id', process.env.FB_CLIENT_ID);
  url.searchParams.append('client_secret', process.env.FB_CLIENT_SECRET);
  url.searchParams.append('code', code);
  url.searchParams.append('redirect_uri', 'http://localhost:4200/oauth_fb');
  try {
    const access_token = await axios.post(url.toString(), {});
    res.status(200);
    console.log(access_token.data);
    res.send({ access_token: access_token.data.access_token });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ errorMessage: 'Something went wrong' });
  }
};

module.exports = { googleAccessCode, fbAccessCode };
