const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true, trim: true }, 
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    is_active: { type: Boolean, required: true, default: true },
    create_date: { type: Date, default: Date.now }
}); 

const User = mongoose.model('user', UserSchema);
module.exports = User;