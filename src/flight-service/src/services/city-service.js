const { CityRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function destroyCity(id) {
  try {
    const city = await cityRepository.destroy(id);

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
      city,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: "Failed to Delete",
    });
  }
}

module.exports = {
  createCity,
  destroyCity,
};
