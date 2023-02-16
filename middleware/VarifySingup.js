const usermodel=require('../model/User');

exports.checkDuplicatEntries=(req,res,next)=>{
        usermodel.findOne({
            email:req.body.email
        }).exec((err,email)=>{
            if(err){
                console.log(err);
                return
            }
            if(email){
                req.flash('message',"email Already Exsist")
               return res.redirect('/')
            }
    
            const password=req.body.password;
            const confirm=req.body.confirmpassword;
            if(password !== confirm){
                req.flash('message',"password & confirm password are NOT matched")
                return res.redirect('/');
            }
            next()
        })
    
}