const studioData = require('../data/studio-list.json');
const { Client } = require('@googlemaps/google-maps-services-js');

const client = new Client({});

const userLocationFinder = async (area, zone, city, country) => {
  const args = {
    params: {
      key: process.env.MAPS_API_KEY,
      address: `${area}, ${zone}, ${city}, ${country}`,
    },
  };
  try {
    const gcResponse = await client.geocode(args);
    const userLocation = gcResponse.data.results[0].geometry.location;
    return userLocation;
  } catch (err) {
    console.log(err);
  }
};

function findDistance(pointA, pointB) {
  return Math.sqrt(
    Math.pow(pointA.coordinates.lat - pointB.coordinates.lat, 2) +
      Math.pow(pointA.coordinates.lng - pointB.coordinates.lng, 2)
  );
}

async function findClosestStudio(area, zone, city, country) {
  const coordinates = await userLocationFinder(area, zone, city, country);
  const point = { coordinates };
  // console.log(point);
  const distances = studioData.map((studio) => {
    const distance = findDistance(point, studio);
    return { ...studio, distance };
  });
  const result = distances.reduce((closest, studio) =>
    studio.distance < closest.distance ? studio : closest
  );
  return result;
}

module.exports = { findClosestStudio };
