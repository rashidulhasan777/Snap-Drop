const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const downloadOrderPhotosFromCloudinary = async (data) => {
    try {
        const { order_id, lab_id } = data;
        const folder_path = `SnapDrop_Gallery/order${order_id}_lab${lab_id}/`;
        const downloadURL = cloudinary.utils.download_folder(folder_path, {
          prefixes: `order${order_id}_lab${lab_id}`,
        });
        console.log(downloadURL);
        return downloadURL;
      } catch (err) {
        console.log(err);
      }
}

module.exports = {
    downloadOrderPhotosFromCloudinary
}