const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const dashbordar = (req, res) => {
    if (req.user) {
        User.find({}, function(err, userDetails) {
            if (!err) {
                res.render("Dashboard", {
                    title: "User | Dashboard",
                    data: req.user,
                    details: userDetails
                })
            } else {
                console.log(err);
            }
        })
    }

}


const register = (req, res) => {
    res.render('Register', {
        message: req.flash('message'),
    })

}


const register_create = (req, res) => {
    //console.log(req.body);
    User({
        userName: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }).save((err, user) => {
        if (!err) {
            //console.log("User Added Successfully...");
            req.flash("message", "User Added");
            res.redirect("/login");
        } else {
            console.log("User Not Added...", err);
        }
    })

}


const login=(req,res)=>{
    loginData = {}
    loginData.email = (req.cookies.email) ? req.cookies.email : undefined
    loginData.password = (req.cookies.password) ? req.cookies.password : undefined
    res.render("Login", {
        title: "Login page",
        message: req.flash('message'),
        data: loginData
    })
}

const login_create=(req,res)=>{
    User.findOne({
        email: req.body.email
    }, (err, data) => {
        if (data) {
            const hashPassword = data.password;
            if (bcrypt.compareSync(req.body.password, hashPassword)) {
                const token = jwt.sign({
                    id: data._id,
                    username: data.userName
                }, "souvik1123456@789", { expiresIn: '5m' });
                res.cookie("userToken", token);
                if (req.body.rememberme) {
                    res.cookie('email', req.body.email)
                    res.cookie('password', req.body.password)
                }
                console.log(data);
                res.redirect("/dashbordars");
            } else {
                req.flash("message", "Invalid Password");
                res.redirect("/login");
            }

        } else {
            req.flash("message", "Invalid Email");
            res.redirect("/login");
        }
    })

}


userAuth = (req, res, next) => {
    if (req.user) {
        console.log(req.user);
        next();
    } else {
        console.log(req.user);
        res.redirect("/login");
    }
}

const logout=(req,res)=>{
    res.clearCookie("userToken");
    res.redirect("/login");
}


module.exports = {
    register,
    register_create,
    login,
    login_create,
    dashbordar,
    userAuth,
    logout
}