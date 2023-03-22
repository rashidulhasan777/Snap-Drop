const Lab = require("./../models/labDetails.model");

const createLab = async (req, res) => {
  try {
    const result = await Lab.create(req.body);
    res.status(201);
    res.send(result);
    return result;
  } catch (error) {
    res.status(500).send({ errorMessage: "Something went wrong" });
    console.log(error);
  }
};
module.exports = { createLab };