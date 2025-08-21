const axios = require("axios");

const { BookingRepository } = require("../repositories");
const bookingRepository = new BookingRepository();

const db = require("../models");
const { ServerConfig, Queue } = require("../config");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");

async function createBooking(data) {
  const transaction = await db.sequelize.transaction();

  try {
    const flight = await axios.get(
      `http://localhost:3000/api/v1/flights/${data.flightId}`
    );

    const flightData = flight.data.flight;

    if (data.noOfSeats > flightData.totalSeats) {
      throw new AppError("Not enough seats available..");
    }

    const totalBillingAmount = data.noOfSeats * flightData.price;

    await axios.patch(
      `http://localhost:3000/api/v1/flights/${data.flightId}/seats`,
      {
        seats: data.noOfSeats,
      }
    );

    const bookingPayload = { ...data, totalCost: totalBillingAmount };

    const booking = await bookingRepository.create(bookingPayload, transaction);

    await transaction.commit();

    Queue.sendData({
      recepientEmail: "cs1010@gmail.com",
      subject: "Flight Booked",
      content: `Booking successfully done for the flight ${flightData.flightId}`,
    });

    return booking;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function makePayment(data) {
  const transaction = await db.sequelize.transaction();
  try {
    const bookingDetails = await bookingRepository.get(
      data.bookingId,
      transaction
    );
    if (bookingDetails.status == "CANCELLED") {
      Queue.sendData({
        recepientEmail: "cs1010@gmail.com",
        subject: "Booking Cancelled",
        content: `Booking successfully done for the flight ${bookingDetails.flightData}`,
      });

      throw new AppError("The booking has expired", 404);
    }

    const bookingTime = new Date(bookingDetails.createdAt);
    const currentTime = new Date();
    if (currentTime - bookingTime > 30) {
      await cancelBooking(data.bookingId);
      throw new AppError("The booking has expired", 404);
    }

    await bookingRepository.update(
      data.bookingId,
      { status: "BOOKED" },
      transaction
    );
    await transaction.commit();

    Queue.sendData({
      recepientEmail: "cs1010@gmail.com",
      subject: "Flight Booked",
      content: `Booking successfully done for the flight ${data.flightData}`,
    });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function cancelBooking(bookingId) {
  const transaction = await db.sequelize.transaction();

  try {
    const bookingDetails = await bookingRepository.get(bookingId, transaction);

    if (bookingDetails.status == "CANCELLED") {
      await transaction.commit();
      Queue.sendData({
        recepientEmail: "cs1010@gmail.com",
        subject: "Booking Cancelled",
        content: `Booking successfully done for the flight ${bookingDetails.flightData}`,
      });

      return true;
    }

    const res = await axios.patch(
      `http://localhost:3000/api/v1/flights/${bookingDetails.flightId}/seats`,
      {
        seats: bookingDetails.noOfSeats,
        dec: 0,
      }
    );

    await bookingRepository.update(
      bookingId,
      { status: "CANCELLED" },
      transaction
    );
    await transaction.commit();
    Queue.sendData({
      recepientEmail: "cs1010@gmail.com",
      subject: "Booking Cancelled",
      content: `Booking successfully done for the flight ${bookingDetails.flightData}`,
    });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function cancelOldBookings() {
  try {
    const time = new Date(Date.now() - 1000 * 300);
    const response = await bookingRepository.cancelOldBookings(time);

    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createBooking,
  makePayment,
  cancelBooking,
  cancelOldBookings,
};
