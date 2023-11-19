const { downloadOrderPhotosFromCloudinary } = require('../models/cloudinary/query');

const downloadOrderPhotos = async (req, res, next) => {
  try {
    const downloadURL = downloadOrderPhotosFromCloudinary(req.body);
    res.status(200).send(downloadURL);
  } catch (err) {
    res.status(400).send({ errorMessage: 'Cannot download photos' });
  }
};

module.exports = { downloadOrderPhotos };
