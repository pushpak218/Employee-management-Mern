const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobileNo: String,
    designation: String,
    gender: String,
    courses: { type: [String], default: [] }, 
    image: String,
    createDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Employee', employeeSchema);
