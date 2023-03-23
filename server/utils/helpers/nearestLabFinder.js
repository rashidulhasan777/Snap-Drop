const studioData = require('../data/studio-list.json');
const { Client } = require('@googlemaps/google-maps-services-js');

const axios = require('axios');

const client = new Client({});

const userLocationFinder = async (area, zone, city, country) => {
  const args = {
    params: {
      // key: process.env.MAPS_API_KEY, // replace the line below with this when integrating it with server
      key: 'AIzaSyAhkieTsOpkBf6tw71b4Y2cUL4RTRasYGo',
      address: `${area}, ${zone}, ${city}, ${country}`,
    },
  };
  try {
    const gcResponse = await client.geocode(args);
    const userLocation = gcResponse.data.results[0].geometry.location;
    return userLocation;

    // return result.data.results[0].geometry.location
  } catch (err) {
    console.log(err);
  }
};

const address = {
  area: 'Manik Mia Aveneu',
  zone: 'Farmgate',
  city: 'Dhaka',
  country: 'Bangladesh',
};

function findDistance(pointA, pointB) {
  return Math.sqrt(
    Math.pow(pointA.coordinates.lat - pointB.coordinates.lat, 2) +
      Math.pow(pointA.coordinates.lng - pointB.coordinates.lng, 2)
  );
}

async function findClosestStudio(address) {
  const { area, zone, city, country } = address;
  const coordinates = await userLocationFinder(area, zone, city, country);
  const point = { coordinates };
  console.log(point);
  const distances = studioData.map((studio) => {
    const distance = findDistance(point, studio);
    return { ...studio, distance };
  });
  const result = distances.reduce((closest, studio) =>
    studio.distance < closest.distance ? studio : closest
  );
  return result;
}

async function test() {
  const result = await findClosestStudio(address);
  console.log(result);
}

test();
