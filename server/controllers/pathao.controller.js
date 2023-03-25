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

const pathaoZones = async (req, res, next) => {
  const baseUrl = 'https://hermes-api.p-stageenv.xyz';
  // console.log(req.body);
  const { pathaoToken, city_id } = req.body;
  try {
    const zones = await axios.get(
      `${baseUrl}/aladdin/api/v1/cities/${city_id}/zone-list`,
      {
        headers: {
          authorization: `Bearer ${pathaoToken}`,
          accept: 'application/json',
          'content-type': 'application/json',
        },
      }
    );

    // console.log(zones.data.data.data);
    res.status(200).send({ zones: zones.data.data.data });
  } catch (err) {
    console.log(err);
    res
      .status(401)
      .send({ errorMessage: `Cannot get zones by city_id ${city_id}` });
  }
};

const pathaoAreas = async (req, res, next) => {
  const baseUrl = 'https://hermes-api.p-stageenv.xyz';
  // console.log(req.body);
  const { pathaoToken, zone_id } = req.body;
  try {
    const areas = await axios.get(
      `${baseUrl}/aladdin/api/v1/zones/${zone_id}/area-list`,
      {
        headers: {
          authorization: `Bearer ${pathaoToken}`,
          accept: 'application/json',
          'content-type': 'application/json',
        },
      }
    );

    // console.log(areas.data.data.data);
    res.status(200).send({ areas: areas.data.data.data });
  } catch (err) {
    console.log(err);
    res
      .status(401)
      .send({ errorMessage: `Cannot get areas by zone_id ${zone_id}` });
  }
};

const patahaoPriceCalc = async (req, res, next) => {
  try {
    // console.log(req.body);
    const {
      store_id,
      item_type,
      delivery_type,
      item_weight,
      recipient_city,
      recipient_zone,
      pathaoToken,
    } = req.body;
    const priceEstimateData = await axios.post(
      'https://hermes-api.p-stageenv.xyz/aladdin/api/v1/merchant/price-plan',
      {
        store_id,
        item_type,
        delivery_type,
        item_weight,
        recipient_city,
        recipient_zone,
      },
      {
        headers: {
          authorization: `Bearer ${pathaoToken}`,
          accept: 'application/json',
          'content-type': 'application/json',
        },
      }
    );
    res.status(201).send({ priceEstimateData: priceEstimateData.data.data });
  } catch (err) {
    console.log(err);
    res.status(400).send({ errorMessage: "Can't get price estimate" });
  }
};
module.exports = {
  pathaoAccessToken,
  pathaoZones,
  pathaoAreas,
  patahaoPriceCalc,
};
