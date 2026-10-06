const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json({
                message: "not authenticated",
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();

    } catch (error) {
        console.log(error.message);
        return res.json({
            status: true,
            message: error.message
        })
    }
}


module.exports = verifyToken