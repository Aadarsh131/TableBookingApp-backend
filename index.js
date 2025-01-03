// Import required modules
const express = require('express');
const cors = require('cors');

import { jwtCheck, jwtParse } from "./middlewares/auth";
import userBookingRouter from "./routes/UserBookingsRoutes";
import userRouter from "./routes/UserRoutes";

// Initialize the app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/restaurant_booking', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB')).catch(err => console.error('MongoDB connection error:', err));


app.use('/api/user', userRouter)
app.use('/api/bookings', jwtCheck, jwtParse, userBookingRouter);


// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
