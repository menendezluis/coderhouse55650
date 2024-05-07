import jwt from 'jsonwebtoken';
import config from "../config/config.js";

const register = (req,res)=>{
    res.send({status:"success",message:"User registered",payload:req.user._id});
}

const failedRegister = (req,res)=>{
    res.send("failed Register");
}

const login = (req,res)=>{
    //serializedUser podrá convertirse en un DTO más adelante.
    const serializedUser = {
        id : req.user._id,
        name : `${req.user.first_name} ${req.user.last_name}`,
        role: req.user.role,
        email: req.user.email
    }
    const token = jwt.sign(serializedUser,config.jwt.SECRET,{expiresIn:"1h"})
    res.cookie(config.jwt.COOKIE,token,{maxAge:3600000}).send({status:"success",payload:serializedUser});
}

const failedLogin = (req,res)=>{
    console.log(req.message);
    res.send("failed Login");
}

const getCurrentUser = (req,res)=> {
    console.log(req.user);
    res.send(req.user);
}

export default {
    login,
    register,
    failedLogin,
    failedRegister,
    getCurrentUser
}