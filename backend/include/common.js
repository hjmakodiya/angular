const jwt = require('jsonwebtoken')
const { JWT_TOKEN_SECRET, BASE_URL } = require("./config.js")

module.exports = {

    validateJwtToken: async (req, res, next) => {
        const headerCookie = req.headers.cookie.split(";");
        let tokenObj = {};

        headerCookie.forEach((i) => {
            tokenObj[i.split("=")[0].trim()] = i.split("=")[1].trim()
        })

        await jwt.verify(tokenObj['auth-token'], JWT_TOKEN_SECRET, async (err, data) => {
            if (err) {
                if (err.name == "TokenExpiredError") {
                    next({ status: 400, message: "Toekn Expire" })
                } else {
                    next({ status: 400, message: "Invalid Token" })
                }
            } else {
                next();
            }
        });
    },

    validateLogin: async (req, res, next) => {
        if (!req.session.isLogin)
            next({ status: 400, message: "Plz login First" })
        next();
    },
}