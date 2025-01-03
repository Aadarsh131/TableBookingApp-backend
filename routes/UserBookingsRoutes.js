const express = require('express');

const Booking = require('../models/booking');
import UserBookingsContoller from "../controllers/UserBookingsController";
import validateBooking from "../middlewares/validate"

const bookingsRouter = express.Router();
bookingsRouter.post('/', validateBooking, UserBookingsContoller.createUserBookings);
bookingsRouter.get('/', UserBookingsContoller.getUserBookings);
bookingsRouter.delete('/:id', UserBookingsContoller.deleteUserBookings);

export default bookingsRouter

