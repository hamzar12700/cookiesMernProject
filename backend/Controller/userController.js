const jwt = require("jsonwebtoken");
const userModel = require("../Models/user.model");
const responseHandler = require("../utils/response");
const { default: nodemailer } = require("nodemailer");

async function signUp(req, res) {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            responseHandler(req, false, "Input Fields Missing", res)
        }
        // console.log("hwoo !! this is controller");

        const user = await userModel({
            username, email, password
        })
        await user.save();

   const otp = Math.floor(10000+Math.random()*90000);

        const transporter = nodemailer.createTransport({
            host : "smtp.gmail.com",
            port : 587,
            secure : false,
            auth : {
                user : process.env.EMAIL,
                pass : process.env.APP_PASSWORD,
            }
        })

        await transporter.sendMail({
            from : process.env.EMAIL,
            to : email , 
            cc: "shahbaz@aptechsite.net", 
            subject : "Your OTP IS Here",
            text : `Your OTP IS ${otp}`
        })

        return res.json({
            status: true,
            message: "Your OTP is send to your account...!!!"
        })

    } catch (error) {
        console.log(error.message);
        return res.json({
            status: false,
            message: error.message
        })
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.json({
                status: true,
                message: "all field missing"
            })
        }
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                status: false,
                message: "email account not found"
            })
        }

        if (user.password !== password) {
            return res.json({
                status: false,
                message: "password not match"
            })
        }

        const payload = {
            email: user.email,
            id: user._id
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        })

     
        try {
  await transporter.verify();
  console.log("Server is ready to take our messages");
} catch (err) {
  console.error("Verification failed:", err);
}


        return res.json({
            status: true,
            message: "User LoggedIn Successfully",
            token
        })


    } catch (error) {
        console.log(error.message);
    }
}



module.exports = {
    login,
    signUp
}