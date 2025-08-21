const CrudRepository = require("./crud-repository");
const { Flight } = require("../models");
const db = require("../models");
const { addRowLockOnFlights } = require("./queries");
class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, sort) {
    const response = await Flight.findAll({
      where: filter,
      order: sort,
    });

    return response;
  }

  async updateRemainingSeats(flightId, seats, dec = true) {
    await db.sequelize.query(addRowLockOnFlights(flightId));

    const flight = await Flight.findByPk(flightId);

    if (parseInt(dec)) {
      if (flight.totalSeats < seats) {
        throw new Error("Not enough seats available on the flight.");
      }

      await flight.decrement("totalSeats", { by: seats });
    } else {
      await flight.increment("totalSeats", { by: seats });
    }

    await flight.reload();

    return flight;
  }
}

module.exports = FlightRepository;
