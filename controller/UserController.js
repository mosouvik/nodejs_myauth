const User=require('../model/User')
const bcrypt=require('bcryptjs')

const register=(req,res)=>{
    res.render('Register',{
        // message: req.flash('message'),
    })

}

const register_create=(req,res)=>{
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
    res.render('Login',{
        // message: req.flash('message'),
    })

}

module.exports={
    register,
    register_create,
    login
}