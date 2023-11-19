const { createLabInDb, getLabNameFromDb } = require('../models/labDetails/labDetails.query');

const createLab = async (req, res) => {
  try {
    const result = await createLabInDb(req.body);
    res.status(201);
    res.send(result);
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
};

const getLabName = async (req, res) => {
  try {
    const labName = await getLabNameFromDb(req.body)
    res.status(200).send({ labName });
  } catch (err) {
    res.status(500).send({ errorMessage: 'Lab Name not found' });
  }
};

module.exports = { createLab, getLabName };
