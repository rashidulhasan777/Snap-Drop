const axios = require('axios');
const { findClosestStudio } = require('../utils/helpers/nearestLabFinder');

const baseUrl = process.env.PATHAO_BASE_URL;

const pathaoAccessToken = async (req, res, next) => {
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
    res.status(200);
    res.send({ pathaoToken: pathaoToken.data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ errorMessage: 'Cannot get access token' });
  }
};

const pathaoZones = async (req, res, next) => {
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
    res.status(200).send({ zones: zones.data.data.data });
  } catch (err) {
    console.log(err);
    res
      .status(401)
      .send({ errorMessage: `Cannot get zones by city_id ${city_id}` });
  }
};

const pathaoAreas = async (req, res, next) => {
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
    res.status(200).send({ areas: areas.data.data.data });
  } catch (err) {
    console.log(err);
    res
      .status(401)
      .send({ errorMessage: `Cannot get areas by zone_id ${zone_id}` });
  }
};
const createOrder = async (req, res, next) => {
  console.log(req.body.pathaoToken);
  const { pathaoToken } = req.body;
  try {
    const store = await axios.post(
      `${baseUrl}/aladdin/api/v1/orders`,
      req.body,
      {
        headers: {
          authorization: `Bearer ${pathaoToken}`,
          accept: 'application/json',
          'content-type': 'application/json',
        },
      }
    );
    res.status(200).send(store.data);
  } catch (err) {
    console.log(err);
    res.status(401).send({ errorMessage: `Cannot create order` });
  }
};

const pathaoFindClosestStudio = async (req, res, next) => {
  try {
    const area = req.currentUser.details.area.area_name;
    const zone = req.currentUser.details.zone.zone_name;
    const city = req.currentUser.details.city.city_name;
    const country = 'Bangladesh';
    const nearestStudio = await findClosestStudio(area, zone, city, country);
    res.status(200).send(nearestStudio);
  } catch (err) {
    console.log(err);
    res.status(400).send({ errorMessage: 'Could not find nearest studio' });
  }
};

const patahaoPriceCalc = async (req, res, next) => {
  try {
    const { store_id, pathaoToken } = req.body;
    const item_type = 1;
    const delivery_type = 48;
    const item_weight = 0.5;
    const recipient_city = req.currentUser.details.city.city_id;
    const recipient_zone = req.currentUser.details.zone.zone_id;
    const priceEstimateData = await axios.post(
      `${baseUrl}/aladdin/api/v1/merchant/price-plan`,
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
    console.log(err.response);
    res.status(400).send({ errorMessage: "Can't get price estimate" });
  }
};

module.exports = {
  pathaoAccessToken,
  pathaoZones,
  pathaoAreas,
  pathaoFindClosestStudio,
  patahaoPriceCalc,
  createOrder,
};
