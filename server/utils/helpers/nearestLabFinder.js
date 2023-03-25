const Lab = require('../../models/labDetails.model');
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
  try {
    const allLabs = await Lab.find({});
    const coordinates = await userLocationFinder(area, zone, city, country);
    const point = { coordinates };
    // console.log(point);
    const labsCoords = allLabs.map((studio) => {
      return { coordinates: { lng: studio.long, lat: studio.lat } };
    });
    const distances = labsCoords.map((studio) => {
      const distance = findDistance(point, studio);
      return { ...studio, distance };
    });
    // const result = distances.reduce((closest, studio) =>
    //   studio.distance < closest.distance ? studio : closest
    // );
    const result = distances.reduce(
      (idx, closest, studio, distances) =>
        closest.distance < distances[idx].distance ? studio : idx,
      0
    );

    return allLabs[result];
  } catch (error) {
    console.log(error);
  }
}

module.exports = { findClosestStudio };
