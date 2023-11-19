const { cutoutProCropImage } = require("../models/cutOutPro/query");

const uploadToOrder = async (req, res, next) => {
  const { id } = req.params;

  try {
    const zipUrl = await cutoutProCropImage(id);
    res.status(200).send({ zipUrl });
  } catch (error) {
    res.status(500).send({ errorMessage: 'Something went wrong' });
  }
};

module.exports = { uploadToOrder };
