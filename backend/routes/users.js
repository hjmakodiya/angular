const Users = require("../model/users")
const bcrypt = require("bcryptjs")
const { SALT, JWT_TOKEN_SECRET, TOKEN_EXPIRE_TIME } = require("../include/config")
const jwt = require("jsonwebtoken")
const { checkLogin, validateJwtToken, validateLogin } = require("../include/common")

module.exports = app => {
    
    app.post('/sign_up', async (req, res, next) => {
        try {
            const { email, password } = req.body

            //check email exist or not
            const user = await Users.findOne({ email })
            if (user) {
                throw { status: 401, message: "Email id already exist." }
            }

            //encrypt password.
            const salt = await bcrypt.genSalt(SALT);
            req.body.password = await bcrypt.hash(password, salt);

            const result = await Users.create(req.body)
            res.status(200)
                .json({ message: "User Added Successfully", data: result })
        } catch (error) {
            next(error)
        }
    })

    app.post('/sign_in', async (req, res, next) => {
        try {
            const { email, password } = req.body

            const user = await Users.findOne({ email }) //here learn() method will allow you to modify mongo response (here user.)
            //check email exist or not
            if (user) {
                let passwordCompare = await bcrypt.compare(password, user.password)
                if (!passwordCompare) {
                    throw { status: 401, message: "Invalid Password" }
                }
            } else {
                throw { status: 401, message: "Invalid Email" }
            }

            if (!user.is_active) {
                throw { status: 401, message: "User is In-active" }
            }

            //create JWT tocken and send it to user in responce
            const authToken = await jwt.sign({ email: user.email }, JWT_TOKEN_SECRET, { expiresIn: TOKEN_EXPIRE_TIME })
            req.session.isLogin = true

            res.status(200)
                //.cookie('auth-token', authToken)
                .json({ expiresIn: TOKEN_EXPIRE_TIME, authToken, email: user.email, username : user.username, role : user.role })
        } catch (error) {
            next(error)
        }
    })

    app.get('/logout', validateJwtToken, async (req, res, next) => {
        try {
            req.session.destroy((err) => {
                if (err) {
                    next(error)
                }
                res.status(200).json({ message: "Logout Successfully" })
            });
        } catch (error) {
            next(error)
        }
    })
}