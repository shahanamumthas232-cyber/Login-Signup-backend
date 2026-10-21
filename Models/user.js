const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    fname: {
        type: String,
         required: true
    },
    sname: {
        type: String,
         required: true
    },
    address: {
        type: String,
         required: true
    },
    phone: {
        type: Number,
         required: true
    },

    pin: {
        type: Number,
         required: true
    }
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'UnBlock'
    },
    // address: {
    //     type: [addressSchema],
    //     validate: [
    //         // Ensure the array has at least one variation
    //         (val) => val.length > 0,
    //         'A product must have at least one size variation.'
    //     ]
    // }
}, {
    timestamps: true,
    timeseries: true
})

const User = mongoose.model('User', userSchema);

module.exports = User;