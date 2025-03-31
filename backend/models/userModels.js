const mongoose = require("mongoose");
var validator = require('validator');
const bcrypt = require("bcryptjs");
const crypto = require("crypto")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please tell us your Name"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        validate:{
            validator:function(val){
                validator.isEmail(val) 
            },
            message:"Please enter a valid email address!"
        }
    },
    photo:{
        type:String
    },
    role:{
        type:String,
        enum:["user","lead-guide","guide","admin"],
        default:"user"
    },
    password:{
        type:String,
        required:[true,"Please enter a password"],
        minlength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        required:[true,"Please confirm your password"],
        validate:{
            validator: function(val){
                if(this.password===val)
                    return true;
                return false;
            },
            message:"Passwords do not match"
        }
    },
    passwordChangedAt:{
        type:Date
    },
    passwordResetToken:{
        type:String
    },
    passwordResetExpires:{
        type:Date
    },
    active:{
        type:Boolean,
        default:true,
        select:false
    }
},
{
    timestamps:true
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password,12)
    this.passwordConfirm = undefined 

    if(!this.isNew) // if user is old one, update passwordChangedAt
        this.passwordChangedAt = Date.now()-1000;
    next()
})

userSchema.pre("/^find/",function(next){
    this.find({active:{$ne:false}})
    next()
})
userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000,10);
        return JWTTimestamp<changedTimeStamp
    }
    return false;
}

userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex') // creates 32 byte random value and converts to hex
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex'); // hashes the token and converts to hex
    this.passwordResetExpires = Date.now() + 10*60*1000; // sets token expiry
    return resetToken
}
const User=mongoose.model("User",userSchema)
module.exports=User