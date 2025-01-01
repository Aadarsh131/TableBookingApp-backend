const express = require('express');

const Booking = require('../models/booking');
import UserBookingsContoller from "../controllers/UserBookingsController";

const bookingsRouter = express.Router();
bookingsRouter.post('/', UserBookingsContoller.createUserBookings);
bookingsRouter.get('/', UserBookingsContoller.getUserBookings);
bookingsRouter.delete('/:id', UserBookingsContoller.deleteUserBookings);

export default bookingsRouter

