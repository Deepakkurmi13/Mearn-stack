const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: [3, "name length should be greater then 3"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        min: 10
    },
    work: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    cPassword: {
        type: String,
        required: true,
        min: 8
    },
    date:{
        type:Date,
        default:Date.now
    },
    messages :[
       {
            name: {
                type: String,
                required: true,
                minlength: [3, "name length should be greater then 3"]
            },
            email: {
                type: String,
                required: true,
            },
            phone: {
                type: Number,
                required: true,
            },
            message : {
                type: String,
                required: true,
            },
       }
    ],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});


userSchema.pre("save", async function(next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cPassword = await bcrypt.hash(this.cPassword, 12);
    }

    next();
});


userSchema.methods.jwtGenerateToken = async function() {

    try {
        const tokenJwt = jwt.sign({ _id: this._id }, process.env.SECURE);
        this.tokens = this.tokens.concat({ token: tokenJwt });
        await this.save();
        return tokenJwt;

    } catch (error) {
        res.send(error);
    }

}


userSchema.methods.addMessage = async function (name, email, phone , message){
    try{

         this.messages = this.messages.concat({name, email, phone , message});
         await this.save();
         return this.messages;
         
    }catch(err){
        res.status(404).send();
    }
}


const Users = new mongoose.model("USERS", userSchema);

module.exports = Users;