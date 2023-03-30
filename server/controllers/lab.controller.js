const Lab = require('./../models/labDetails.model');

const createLab = async (req, res) => {
  try {
    const result = await Lab.create(req.body);
    res.status(201);
    res.send(result);
    return result;
  } catch (error) {
    res.status(500).send({ errorMessage: 'Something went wrong' });
    console.log(error);
  }
};

const getLabName = async (req, res) => {
  try {
    const { labId } = req.body;
    // console.log(labId);
    const { labName } = await Lab.findOne({ labId: labId });
    res.status(200).send({ labName });
  } catch (err) {
    res.status(500).send({ errorMessage: 'Lab Name not found' });
  }
};

module.exports = { createLab, getLabName };
