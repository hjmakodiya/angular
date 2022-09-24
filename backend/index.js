const express = require('express')
const bodyParser = require("body-parser");
const session = require('express-session')
var cors = require('cors')
const { PORT, SESSION_SECRET } = require("./include/config")
const { initPool } = require("./include/db")
const { s3Pool } = require("./include/aws_connection");
const { errorHandler } = require("./include/middleware")

//set of app use
const app = express()
//app.use(cors({origin: 'http://localhost:4200', credentials: true}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: false
    })
);

// Allow CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Expose-Headers", "*");
    //res.header("Access-Control-Allow-Headers", "Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma");
    res.header("Access-Control-Allow-Headers", "X-Total-Count, Content-Type");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

//initialize DB connection
app.initDb = async (poolPromise) => { app.pool = await initPool(poolPromise) }

//init AWS S# bucket
app.initAws = async () => { app.awsPool = await s3Pool() };

// Available Routes
require('./routes/users')(app)
require('./routes/products')(app)
require('./routes/departments')(app)
require('./routes/employees')(app)

// error handler
app.use(errorHandler)

Promise.all([app.initDb(null)]).then(function () {
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`)
    })
})