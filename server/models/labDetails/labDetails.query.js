const { models } = require('mongoose');
const Lab = require('../labDetails/labDetails.model');


const createLabInDb = async (data) => {
    try {
        const result = await Lab.create(data);
        return result;
      } catch (error) {
        console.log(error);
      }
}

const getLabNameFromDb = async (data) => {
    try {
        const { labId } = data;
        // console.log(labId);
        const { labName } = await Lab.findOne({ labId: labId });
        return labName
      } catch (err) {
        console.log(err);
      }
}
module.exports = {
    createLabInDb,
    getLabNameFromDb
}