const express = require('express');

let router = express.Router();  

router.post('/login' , async(req,res)=>{
    let { email, password } = req.body || {} ;
    try{
        await User.findOne({ email : email, password : password }, 'uid name isAdmin email image isVaccinated ', (err , user)=>{
            if(err) throw new Error("User doesn't exist!");
            return res.status(200).send({status : 1, user: user, message : "User logged in successfully"});
        })
    }catch(err){
        return res.status(500).send({status : 0 , message : err});
    }
})

router.post('/register' , async(req, res)=>{
    let { uid, name, email, password, image, isVaccinated, vaccinationCertificate } = req.body || {};
    let userBody = {
        uid : uid, 
        name : name, 
        email : email, 
        password : password, 
        image : image, 
        isVaccinated : isVaccinated, 
        vaccinationCertificate : vaccinationCertificate,
        isAdmin : true,
    };
    try{
        await new User(userBody).save().then((user)=>{
            if(!user) throw new Error("User could not be saved!");
            return res.status(200).send({status : 1 , message : 'User registered successfully!'}) ;
        })
    }catch(err){
        return res.status(500).send({status : 0 , message : err});
    }
})

module.exports = router;
