import Booking from "../models/Booking.js";

const getUserBookings = async (req, res) => {
    const { date, time, guests, name, contact } = req.body;
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching bookings', error: err.message });
    }
}
const createUserBookings = async (req, res) => {
    try {
        const { date, inTime, outTime, guests, name, contact } = req.body;

        // Check for existing booking at the same date and time, just in case (bcoz anyway we will be showing available slots to the user)
        const existingBooking = await Booking.find({ date });

        //[inTime: 9am, outTime: 12pm] 
        // [inTime: 7am, outTime: 11pm] 
        if (existingBooking) {
            return res.status(400).json({ message: 'Time slot already booked' });
        }

        const newBooking = new Booking({ date, inTime, outTime, guests, name, contact });
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

//timeIn- 9pm
//timeOut- 12am
//date- 15/01/2025