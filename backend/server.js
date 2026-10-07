const express = require("express");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer")
const router = require("./Router/router");
const connectDB = require("./utils/db");
const multer = require("multer");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();


let app = express();
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));

app.use(cookieParser());


// console.log(req.cookies);


// const transporter = nodemailer.createTransport({
//     service : 'gmail'
// })

app.use(express.json());

app.use('/api/v1/auth', router)

app.get("/hamza",(req,res)=>{
    return res.send("hello world!!!");
})
connectDB()
 
let PORT = process.env.PORT || 2000
console.log(PORT);


              

app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`);
})