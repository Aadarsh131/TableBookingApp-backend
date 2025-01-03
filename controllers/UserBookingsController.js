import Booking from "../models/Booking.js";

const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId : req.userId });
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching bookings', error: err.message });
    }
}
const createUserBookings = async (req, res) => {
    try {
        const { date, time, guests, name, contact } = req.body;

        //move this to validation middleware
        //check if time[] is valid
        if (time.length !== 2) {
            return res.status(400).json({ message: "Invalid time" })
        }
        if (time[0] >= time[1]) {
            return res.status(400).json({ message: "Invalid time" })
        }
        if (time[1] - time[0] < 15) { //minimum booking time set to  15 minutes
            return res.status(400).json({ message: "Min booking time should be 15 min" })
        }

        // Check for existing booking at the same date and time, just in case (bcoz anyway we will be showing available slots to the user)
        const existingDayBooking = await Booking.find({ date });
        const existingTimeBooking = existingDayBooking.find(booking => {
            // if time[0] lies btw [inTime, outTime]
            if (time[0] >= booking.time[0]) {
                if (time[1] <= booking.time[1]) {
                    return true
                }
            }
            //if time[1] lies btw [inTime, outTime]
            if (time[1] >= booking.time[0]) {
                if (time[1] <= booking.time[1]) {
                    return true
                }
            }

        })
        if (existingTimeBooking) {
            return req.status(400).json({ message: "Time slot alread booked" })
        }
        //else book the slot
        const newBooking = new Booking({ date, time, guests, name, contact });
        newBooking.bookedAt = new Date(); //backend will set the booking time
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(500).json({ message: 'Error creating booking', error: err.message });
    }
}
const deleteUserBookings = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBooking = await Booking.findByIdAndDelete(id);

        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting booking', error: err.message });
    }
}

export default { getUserBookings, createUserBookings, deleteUserBookings }