const express = require("express");
const {login , signUp} = require("../Controller/userController");
const verifyToken = require("../utils/verifyToken");

let router = express.Router();

// http://localhost:5000/api/v1/auth/signUp
router.post("/signUp", signUp)
router.post("/login",login )

router.post("/logout",(req,res)=>{
    res.clearCookie("token");

    return res.json({
        status : true, 
        message : "Logout successfully"
    })
})

router.get("/profile", verifyToken , (req,res)=>{
    return res.json({
        status : true,
        message : "Welcome !! Home Page",
        user : req.user
    })
})

module.exports = router