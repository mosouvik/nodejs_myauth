const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const userAuth=require('./middleware/userAuth')

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(flash());
app.use(cookieParser())

app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'souvik',
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(userAuth.authJwt)

const userroute=require('./routes/UserRoute');
app.use(userroute)

port = process.env.PORT || 3400

const Dbcon = "mongodb+srv://nodeClassjan:BrnrXRpwEfvb35kG@cluster0.4axmojt.mongodb.net/gitAuthor";
mongoose.connect(Dbcon, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
    app.listen(port, () => {
        console.log("DB Connected...");
        console.log(`App Running On http://localhost:${port}`);
    })
}).catch(err => {
    console.log(err);
})