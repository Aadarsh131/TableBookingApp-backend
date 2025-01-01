import User from "../models/user"
const createUser = async (req, res) => {
    try {
        const { auth0Id } = req.body
        const existingUser = await User.findOne({ auth0Id })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const newUser = new User(req.body)
        await newUser.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(500).json({ message: "Error creating user", error: err.message })
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ authOId: req.authOId })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ message: "Error fetching user", error: err.message })
    }
}

export default { createUser, getUser }