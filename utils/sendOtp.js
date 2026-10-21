const nodemailer = require('nodemailer');


async function sendOtp(email, otp) {
    console.log("sendOtp");
    
    const transporter = nodemailer.createTransport({
        
        service: 'gmail',
        auth: {
            user: "shahahanamummthas@gmail.com",
            pass: "hzbd xrhf udlv yzko"
        }

    })

    console.log("sendOtp");

// await transporter.sendMail({
//     from: '"MyApp" <no-reply@myapp.com>',
//     to: email,
//     subject: "Your OTP Code",
//     text: `Your OTP code is ${otp}`
//   });

// }

(async () => {
  console.log("from node mail");
  
  const info = await transporter.sendMail({
    from: '"otp from" <shahahanamummthas@gmail.com>',
    to: email,
    subject: "Hello ✔",
    text: `Your OTP code is ${otp}`
  });

  console.log("Message sent:", info.messageId);
})();

}


module.exports = sendOtp;