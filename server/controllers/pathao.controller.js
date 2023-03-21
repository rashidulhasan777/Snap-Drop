const axios = require('axios');

const pathaoAccessToken = async (req, res, next) => {
  const baseUrl = 'https://hermes-api.p-stageenv.xyz';
  const issueBody = {
    client_id: '267',
    client_secret: 'wRcaibZkUdSNz2EI9ZyuXLlNrnAv0TdPUPXMnD39',
    username: 'test@pathao.com',
    password: 'lovePathao',
    grant_type: 'password',
  };
  try {
    const pathaoToken = await axios.post(
      baseUrl + '/aladdin/api/v1/issue-token',
      issueBody,
      {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
      }
    );
    // console.log(pathaoToken.data);
    res.status(200);
    res.send({ pathaoToken: pathaoToken.data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ errorMessage: 'Cannot get access token' });
  }
};

module.exports = { pathaoAccessToken };
