const AirplaneRepository = require("./airplane-repository");
const AirportRepository = require("./airport-repository");
const BookingRepository = require("./booking-repository");
const CityRepository = require("./city-repository");

module.exports = {
    AirplaneRepository : require('./airplane-repository'),
    AirportRepository:require('./airport-repository'),
    CityRepository:require('./city-repository'),
    FlightRepository:require('./flight-repository'),
    BookingRepository:require('./booking-repository')
}