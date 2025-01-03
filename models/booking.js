const mongoose = require('mongoose');

// Define the Booking schema
const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    date: { type: String, required: true },
    time: [{ type: String, required: true }], //[in-time, out-time]
    guests: { type: Number, required: true },
    bookedAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;