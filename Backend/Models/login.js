const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const loginSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    createDate: { type: Date, default: Date.now }
});

loginSchema.plugin(AutoIncrement, { inc_field: 'no' });

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;
