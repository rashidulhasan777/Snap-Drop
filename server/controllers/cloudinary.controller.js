const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const downloadOrderPhotos = async (req, res, next) => {
  try {
    const { order_id, lab_id } = req.body;
    const folder_path = `SnapDrop_Gallery/order${order_id}_lab${lab_id}/`;
    // console.log(folder_path);
    const downloadURL = cloudinary.utils.download_folder(folder_path, {
      prefixes: `order${order_id}_lab${lab_id}`,
    });
    // console.log(downloadURL);
    res.status(200).send(downloadURL);
  } catch (err) {
    console.log(err);
    res.status(400).send({ errorMessage: 'Cannot download photos' });
  }
};

module.exports = { downloadOrderPhotos };
