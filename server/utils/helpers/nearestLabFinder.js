const Lab = require('../../models/labDetails.model');
const { Client } = require('@googlemaps/google-maps-services-js');

const client = new Client({});

const userLocationFinder = async (country, city, zone, area = '') => {
  console.log(`${area ? area + ',' : ''} ${zone}, ${city}, ${country}`);
  // const args = {
  //   params: {
  //     key: process.env.MAPS_API_KEY,
  //     address: `${area ? area + ',' : ''} ${zone}, ${city}, ${country}`,
  //   },
  // };
  // try {
  //   const gcResponse = await client.geocode(args);
  //   console.log("from distance response",gcResponse)
  //   const userLocation = gcResponse.data.results[0].geometry.location;
  //   return userLocation;
  // } catch (err) {
  //   console.log({err:"kajdshfkasjdfhls"});
  // }
  try{
    const responseFromMapbox = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/{${zone}}.json?access_token=pk.eyJ1IjoiYXNpZnVycmFobWFucGlhbCIsImEiOiJjbG9oaG0zMnQxZDVhMm1yd3c1bTVwZWQ4In0.HjT23K3i1ur6Jy9KaikNEw`);
    const data = await responseFromMapbox.json();
    return {lng: data.features[0].geometry.coordinates[0], lat: data.features[0].geometry.coordinates[1]};
  } catch(err){
    console.log("hello error",err)
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
    const coordinates = await userLocationFinder(country, city, zone, area);
    const point = { coordinates };
    console.log("from userDistance coordinates",point);
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
    console.log("from userDistance result",result);
    return allLabs[result];
  } catch (error) {
    console.log(error);
  }
}

module.exports = { findClosestStudio };
