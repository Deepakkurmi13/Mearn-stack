const express =  require("express");
require("../db/conn");
const users = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async(req, res) => {

    try {
        const { name, email, phone, work, password, cPassword } = req.body;
        
        const findEmail = await users.findOne({ email: email });

        if (findEmail) {
            return res.status(422).json({ error: "Email already Exist" });
        } else {

            if (!name || !email || !phone || !work || !password || !cPassword) {
                return res.status(422).json({ error: "Please Fill Field Properly" });
            } else {
                if (password === cPassword) {
                    const data = new users({ name, email, phone, work, password, cPassword });
                    await data.save();

                    return  res.status(201).json({ message: "Your Registration successfully" });
 
                } else {
                    return res.status(422).json({ error: "Password are not Match" });
                }
            }
        }

    } catch (err) {
        res.send(err);
    }

}

exports.signin = async(req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return  res.status(422).json({ error: "Fill the Field" });
        } else {

            const findData = await users.findOne({ email: email });

            if (findData) {
                const passCom = await bcrypt.compare(password, findData.password);
                if (!passCom) {
                    return  res.status(422).json({ error: "Invalid Credentials password" });
                } else {
                    const token = await findData.jwtGenerateToken();

                    res.cookie("jwtToken", token, {
                        expires: new Date(Date.now() + 8 * 3600000),
                        httpOnly: true
                    });
                    return  res.status(200).json({ message: "Login Successfully" });
                }

            } else {
                return  res.json({ error: "Invalid Details" })
            }
        }

    } catch (error) {
        res.send(error);
    }

}


exports.userAuth = async(req ,res ,next) =>{
    try {
        
        const token = req.cookies.jwtToken;        
        const userToken = jwt.verify(token ,process.env.SECURE);
        const  foundUser = await users.findOne({_id:userToken._id ,"tokens.token":token});
       
        req.user = foundUser;
        req.token = token;
        req.userID =  foundUser._id;
        next();
    
    }catch(error){
        res.status(404).send();
    } 
}
