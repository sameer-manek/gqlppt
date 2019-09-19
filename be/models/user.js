const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, unique: false, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, unique:false, trim: true, default: null },
})

module.exports = mongoose.model('User', userSchema)