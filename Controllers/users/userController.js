const bcrypt = require('bcrypt');
const User = require('../../Models/user.js');
const OTP = require('../../Models/otp.js');
const sendOtp = require('../../utils/sendOtp.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const postSignin = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        console.log('-:',req.body)
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "User already Exists!!!" })
        }
        const otpCode = Math.floor(1000 + Math.random() * 9000).toString();

        const expiry = Date.now() + 5 * 60 * 1000;
        await OTP.create({
            email,
            otp: otpCode,
            createdAt: Date.now(),
            expiredAt: expiry,
            name,
            phone,
            password
        })
        await sendOtp(email, otpCode);
        res.status(200).json({ message: "OTP sent to email, verify to complete signup" });
    } catch (error) {
        console.log('error',error)
        res.status(500).json({ message: error.message });

    }

};

const postVerifyOTP = async (req, res) => {
    try {
        const { name, email, phone, password, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ message: "Email & OTP required" });
        }
        const otpRecord = await OTP.findOne({ email, otp });
        if (!otpRecord) {
            return res.json({ message: 'Invalid  or expired OTP' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newCustomer = await User.create({
            name,
            email,
            phone,
            password: hashedPassword
        });
        await newCustomer.save();
        await OTP.deleteMany({ email });
        console.log(newCustomer);
        res.status(200).json({ message: "successfully Signed" });

    } catch (error) {

        console.log(error);
        res.status(500).json({ message: "An error occured", error: error });

    }
};

const postLogin = async (req, res) => {

    try {

        const { email, password } = req.body;
        const customer = await User.findOne({ email });

        if (!customer) {
            return res.status(404).json({ message: 'user not exisst!!!' });
        } else if (!(await bcrypt.compare(password, customer.password))) {
            return res.status(400).json({ message: 'password incorect!!!' });
        } else if (customer.status === "Block") {
            return res.status(400).json({ message: 'blocked user!!!' });
        }

        const payload = {
            userId: customer._id,
            userName: customer.email

        }
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY)
        res.status(200).json({ message: "success", token, customer });

    } catch (error) {

        console.log(error);
        res.status(500).json({ message: "An error occured", error: error });

    }
};

const getAddress = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id)
         if (!user) {
            return res.status(400).json({message:'user Not Found'});
        }
        const userCount = user.address.length;
        const userAddress = user.address;
        res.status(200).json({message: "Address added successfully...", userAddress, userCount});
    } catch (error) {
        console.log(error);
        
    }
}





module.exports = {

    postSignin,
    postVerifyOTP,
    postLogin,
    getAddress

}