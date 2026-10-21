const express = require('express');
const router = express.Router();


const {
    postSignin,
    postVerifyOTP,
    postLogin,
    getAddress,
    
} = require('../../Controllers/users/userController.js');

router.post('/signin', postSignin);

router.post('/verifyOtp', postVerifyOTP);

router.post('/login',postLogin);

router.get('/products',getProducts);

// router.get('/getAddress/:id',getAddress);

module.exports = router;