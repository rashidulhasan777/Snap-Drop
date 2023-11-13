const axios = require('axios');
const cloudinary = require('cloudinary').v2;
const Orders = require('../models/order/order.model');
const countryBasedSizes = require('../utils/data/requirementsFromLab.json');

const cutoutProCropImage = async (imageUrl, country) => {
  const countryInfo = countryBasedSizes.find(
    (el) => el.country.toLowerCase() === country.toLowerCase()
  );
  try {
    const axiosImageData = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
    });
    const imageCloudinary = axiosImageData.data;
    const data = Buffer.from(imageCloudinary, 'binary').toString('base64');
    const dataForCutOutPro = {
      base64: data,
      bgColor: countryInfo.bgColor,
      dpi: 300,
      mmHeight: countryInfo.mmHeight,
      mmWidth: countryInfo.mmWidth,
      printBgColor: countryInfo.bgColor,
      printMmHeight: 0,
      printMmWidth: 0,
    };
    const axiosCutOutData = await axios.post(
      'https://www.cutout.pro/api/v1/idphoto/printLayout',
      dataForCutOutPro,
      {
        headers: {
          APIKEY: process.env.CUTOUT_PRO,
          'Content-Type': 'application/json',
        },
      }
    );
    const idPhotoImage = axiosCutOutData.data.data.idPhotoImage;
    console.log(idPhotoImage)
    return idPhotoImage;
    // cloudinaryUpload(idPhotoImage);

    // Not needed, since Cloudinary can direcly get the image from amazon s3 bucket
    // const photo = await axios.get(idPhotoImage, {
    //   responseType: 'arraybuffer',
    // });
    // const photoData = photo.data;
    // const image = Buffer.from(photoData, 'binary');
  } catch (error) {
    console.log(error);
  }
};

const uploadToOrder = async (req, res, next) => {
  const { id } = req.params;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const order = await Orders.findById(id);
    for (const image of order.passportPictures) {
      const url = await cutoutProCropImage(
        image.imageURL,
        order.countryForPassport
      );
      const cloudinaryData = await cloudinary.uploader.upload(url, {
        public_id: `${order.order_id}_lab${order.labId}/passport_cutout/${image.orgFilename}`,
      });
    }
    const zipUrl = cloudinary.utils.download_zip_url({
      prefixes: `${order.order_id}_lab${order.labId}/`,
    });
    res.status(200).send({ zipUrl });
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMessage: 'Something went wrong' });
  }
};

module.exports = { uploadToOrder };
