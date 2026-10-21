const mongoose = require('mongoose');

const otpSchema = mongoose.Schema(
    {
         name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        password: {
            type: String,
            required: false
        },
        otp: String,
        createdAt: Date,
        expiredAt: Date,

    }
);

const OTP = mongoose.model('otp', otpSchema);

module.exports = OTP;