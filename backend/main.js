const express = require('express');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const config = require('./config.json');
const cors = require("./middleware/cors");
const router = require('./routes/root');
const fileUpload = require('express-fileupload')
const app = express();

app.use(cors)
app.use(express.json())
app.use(fileUpload())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(cookieParser(config.SECRET));

app.use(
    session({
        key: "user",
        secret: config.SECRET,
        resave: false,
        saveUninitialized: false,
        domain: "http://localhost",
        path: "/",
        cookie: { maxAge: 86400000, httpOnly: true },
    })
);

app.use('/api', router)

app.listen(config.PORT, () => {
    console.log(`Server started on port: ${config.PORT}`)
})




