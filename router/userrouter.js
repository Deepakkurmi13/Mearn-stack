const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");
const {register ,signin ,userAuth} = require("../controllers/auth");

router.get("/checkUser", userAuth, async(req, res ,next) =>{
    try{
          if(req.user.phone){
                const phone = req.user.phone;
                res.status(200).send({phone:phone});
           }
           next();
    }catch(err){
          res.status(404).send();
    }
});

router.get("/about", userAuth, (req, res) => {
    try{

        res.status(200).send(req.user);

    }catch(err){
        res.send();
    }
    
});

router.get("/contact", userAuth, (req, res) => {
    try{

        res.status(200).send(req.user);

    }catch(err){
        res.send();
    }
    
});

router.post("/register",register);

router.post("/signin", signin);



router.get("/logout", userAuth, async (req ,res ,next) =>{
    try{  
        if(req.user){
            req.user.tokens = [];
            await req.user.save();
            res.clearCookie("jwtToken"); 
        }  
          res.status(200).send("logout"); 
          next();
    }catch(err){
        res.send();
    }
});


router.post("/sendUpdate" , userAuth ,async(req, res , next) =>{
    try{

        const { name, email, phone , message} = req.body;

        if(!name || !email || ! phone ||  !message ){
            res.status(422).json({error : "please fill all details"});
        }else{

            const user =  await users.findOne({_id:req.userID});

            if(user){

                await user.addMessage(name, email, phone , message);

               await user.save();

               res.status(200).json({message : "user message successfully "});
            }
        }
        next();
    }catch(err){
        res.send();
    }
});


module.exports = router;