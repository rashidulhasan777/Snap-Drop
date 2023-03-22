const studioData = require('../data/studio-list.json');

const point = {
  coordinates: {
    lat: 24.41361,
    lng: 90.33183,
  },
};

function findDistance(pointA, pointB) {
  return Math.sqrt(
    Math.pow(pointA.coordinates.lat - pointB.coordinates.lat, 2) +
      Math.pow(pointA.coordinates.lng - pointB.coordinates.lng, 2)
  );
}

function findClosestStudio(point) {
  const distances = studioData.map((studio) => {
    const distance = findDistance(point, studio);
    return { ...studio, distance };
  });

  const result = distances.reduce((closest, studio) =>
    studio.distance < closest.distance ? studio : closest
  );
  return result;
}

console.log(findClosestStudio(point));
