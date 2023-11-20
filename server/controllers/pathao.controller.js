
const { getPathaoAccessToken, getPathaoZones, getPathaoAreas, createOrderToDb, getPathaoColsetstStudio, getPathaoPriceEstimate } = require('../models/pathao/query');

const baseUrl = process.env.PATHAO_BASE_URL;

const pathaoAccessToken = async (req, res, next) => {
  try {
    const pathaoToken = await getPathaoAccessToken()
    res.status(200);
    res.send({ pathaoToken: pathaoToken.data });
  } catch (err) {
    res.status(500).send({ errorMessage: 'Cannot get access token' });
  }
};

const pathaoZones = async (req, res, next) => {
  const { pathaoToken, city_id } = req.body;
  try {
    const zones = await getPathaoZones(pathaoToken, city_id);
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
    const areas = await getPathaoAreas(pathaoToken, zone_id);
    res.status(200).send({ areas: areas.data.data.data });
  } catch (err) {
    res
      .status(401)
      .send({ errorMessage: `Cannot get areas by zone_id ${zone_id}` });
  }
};
const createOrder = async (req, res, next) => {
  const { pathaoToken } = req.body;
  const { id } = req.body;
  try {
    const store = await createOrderToDb(id, pathaoToken)
    console.log(store.data);
    res.status(200).send(store.data);
  } catch (err) {
    res.status(401).send({ errorMessage: `Cannot create order` });
  }
};

const pathaoFindClosestStudio = async (req, res, next) => {
  try {
    const nearestStudio = getPathaoColsetstStudio(req.currentUser)
    res.status(200).send(nearestStudio);
  } catch (err) {
    console.log(err);
    res.status(400).send({ errorMessage: 'Could not find nearest studio' });
  }
};

const patahaoPriceCalc = async (req, res, next) => {
  try {
    let { store_id, pathaoToken } = req.body;
    const priceEstimateData = await getPathaoPriceEstimate(store_id,pathaoToken,req.currentUser)
    res.status(201).send({ priceEstimateData: priceEstimateData.data.data });
  } catch (err) {
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
