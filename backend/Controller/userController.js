const jwt = require("jsonwebtoken");
const userModel = require("../Models/user.model");
const responseHandler = require("../utils/response");

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
        return res.json({
            status: true,
            message: "Data Inserted Successfully"
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