const axios = require('axios');
const Order = require('../order/order.model');
const User = require('../user/user.model');
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

const createOrderToDb = async (data) => {
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
    console.log(store.data);
    res.status(200).send(store.data);
  } catch (err) {
    console.log(err.response.data);
    res.status(401).send({ errorMessage: `Cannot create order` });
  }
}


module.exports = {
    getPathaoAccessToken,
    getPathaoZones,
    getPathaoAreas,
    createOrderToDb
}