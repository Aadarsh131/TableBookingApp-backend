const { z } = require("zod");

// User validation schema
const userValidationSchema = z.object({
    auth0Id: z.string().nonempty("auth0Id is required"),
    name: z.string().optional(), // Optional name
    phone: z
        .string()
        .nonempty("Phone number is required")
        .refine((value) => /^[+\d]?(?:[\d-.\s()]*)$/.test(value), {
            message: "Invalid phone number format",
        }),
    email: z.string().email("Invalid email address"),
});

// Booking validation schema
const bookingValidationSchema = z.object({
    user: z.string().nonempty("User ID is required"), // Reference to User
    date: z
        .string()
        .nonempty("Date is required")
        .refine((value) => !isNaN(Date.parse(value)), {
            message: "Invalid date format",
        }),
    time: z
        .array(
            z
                .string()
                .nonempty("Time cannot be empty")
                .refine((value) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(value), {
                    message: "Invalid time format, use HH:mm",
                })
        )
        .length(2, "Time must include both in-time and out-time"),
    guests: z
        .number()
        .int("Guests must be an integer")
        .positive("Guests must be greater than zero"),
    bookedAt: z.date().default(() => new Date()), // Default value
});

// Middleware for handling validation errors
const handleValidation = (schema) => {
    return (req, res, next) => {
        try {
            const parsedData = schema.parse(req.body); // Parse and validate the request body
            // req.validatedData = parsedData; // Attach parsed data to the request object
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    errors: error.errors.map((err) => ({
                        path: err.path.join("."),
                        message: err.message,
                    })),
                });
            }
            next(error);
        }
    };
};

// Validation middleware
const validateUser = handleValidation(userValidationSchema);
const validateBooking = handleValidation(bookingValidationSchema);

export default {
    validateUser,
    validateBooking,
};
