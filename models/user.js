import { mongoose } from 'mongoose';

// User schema
const userSchema = new mongoose.Schema({
    auth0Id: { type: String, required: true },
    name: { type: String },
    //Contact details
    phone: { type: String, required: true },
    email: { type: String, required: true },
})

const User = mongoose.model('User', userSchema);
export default User;