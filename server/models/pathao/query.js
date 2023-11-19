const axios = require('axios');
const Order = require('../order/order.model');
const Lab = require('../labDetails/labDetails.model');
const { findClosestStudio } = require('../../utils/helpers/nearestLabFinder');

const baseUrl = process.env.PATHAO_BASE_URL;

const getPathaoAccessToken = async () => {
    const issueBody = {
        client_id: process.env.PATHAO_CLIENT_ID,
        client_secret: process.env.PATHAO_CLIENT_SECRET,
        username: process.env.PATHAO_CLIENT_EMAIL,
        password: process.env.PATHAO_CLIENT_PASSWORD,
        grant_type: process.env.PATHAO_GRANT_TYPE,
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
        return pathaoToken;
      } catch (err) {
        console.log(err);
      }
}
const getPathaoZones = async (pathaoToken, city_id) => {
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
    return zones;
  } catch (err) {
    console.log(err);
  }
}
const getPathaoAreas = async (pathaoToken, zone_id) => {
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
    return areas;
  } catch (err) {
    console.log(err);
  }
}

const createOrderToDb = async (id,pathaoToken) => {
  try {
    const order = await Order.findById(id);
    const labUser = await Lab.findOne({ labId: order.labId });
    console.log(labUser);
    orderDetails = {
      store_id: '' + order.labId,
      merchant_order_id: '',
      sender_name: labUser.labDetails.contact_name,
      sender_phone: labUser.labDetails.contact_number.slice(-11),
      recipient_name: order.orderDelivaryDetails.name,
      recipient_phone: order.orderDelivaryDetails.contact_number.slice(-11),
      recipient_address: order.orderDelivaryDetails.address,
      recipient_city: '' + order.orderDelivaryDetails.city.city_id,
      recipient_zone: '' + order.orderDelivaryDetails.zone.zone_id,
      recipient_area: order.orderDelivaryDetails.area
        ? '' + order.orderDelivaryDetails.area.area_id
        : '',
      delivery_type: '48',
      item_type: '2',
      special_instruction: '',
      item_quantity: '1',
      item_weight: '0.5',
      amount_to_collect: '0',
      item_description: '',
    };

    const store = await axios.post(
      `${baseUrl}/aladdin/api/v1/orders`,
      orderDetails,
      {
        headers: {
          authorization: `Bearer ${pathaoToken}`,
          accept: 'application/json',
          'content-type': 'application/json',
        },
      }
    );
    return store
  } catch (err) {
    console.log(err.response.data);
  }
}
const getPathaoColsetstStudio = async (currentUser)=>{
  try {
    const area = currentUser.details.area
      ? currentUser.details.area.area_name
      : '';
    const zone = currentUser.details.zone.zone_name;
    const city = currentUser.details.city.city_name;
    const country = 'Bangladesh';
    const nearestStudio = await findClosestStudio(area, zone, city, country);
    return nearestStudio;
  } catch (err) {
    console.log(err);
  }

}
const getPathaoPriceEstimate = async(store_id, pathaoToken,currentUser)=>{
  try {
    store_id = '' + store_id;
    const item_type = '' + 1;
    const delivery_type = '' + 48;
    const item_weight = '' + 0.5;
    const recipient_city = '' + currentUser.details.city.city_id;
    const recipient_zone = '' + currentUser.details.zone.zone_id;
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
    return priceEstimateData
  } catch (err) {
    console.log(err);
  }
}




module.exports = {
    getPathaoAccessToken,
    getPathaoZones,
    getPathaoAreas,
    createOrderToDb,
    getPathaoColsetstStudio,
    getPathaoPriceEstimate
}