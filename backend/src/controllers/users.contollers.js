import express from "express";
import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import httpStatus from "http-status";         //help in generating status code
import crypto from "crypto";
import { generateToken } from "../utilities/jwt.js";



const signup= async function (req,res){
  
    let {userName,password}= req.body;
    // console.log(userName);
    const data= await User.find({userName:userName});        //returns an array
    // console.log(data);
    if(data.length!==0){
        res.status(httpStatus.CONFLICT).json({message:"User already Registered"});   //conflict 
    }
    else{
        const saltRounds=10;
        const hash=await bcrypt.hash(password,saltRounds);
        //console.log(hash);
        let newUser= new User({
            name:req.body.name,
            userName: req.body.userName,
            password: hash,
        });

        await newUser.save().then(()=>{
            console.log("saved");
        });
        res.status(httpStatus.CREATED).json({message:"Registration Successfull"});
    }
}

const signin =async function (req,res){
    //console.log(req.body);
    let userName= req.body.userName;
    let password= req.body.password;
    if(!userName || !password){                 //wont  come into effect as form validation is in application
        return res.status(httpStatus.BAD_REQUEST).json({messgae:"Enter Required Information"});
    }
    
    const user=await User.findOne({userName:userName});
    //console.log(user);
    if(!user){
        return res.status(httpStatus.NOT_FOUND).json({message:"User not Registered"});
    }
    const result=await bcrypt.compare(password,user.password);    //return a boolean value //bcypt errors not getting cvered in wrapAync
    //console.log(result);
    if(result){   //login successfull
        //const token=generateToken(user);   not implementing the JWT logic rt now
        //push token in database
        user.token=crypto.randomBytes(20).toString("hex");
        await user.save().then(()=>{
            console.log("updated");
        })
        const jwtoken=generateToken(user);
        res.cookie('jwtoken', jwtoken, {
           httpOnly: true,    // 🚫 JS can't read this
           secure: true,      // ✅ send only over HTTPS
           sameSite: 'Strict',// prevent CSRF from other sites
           maxAge: 24 * 60 * 60 * 1000 // 1 day in ms
        });

        res.status(httpStatus.OK).json({jwtoken,message: "Logged in succesfully",token:user.token});
    }
    else{
        res.status(httpStatus.BAD_REQUEST).json({message: "Entered Password or Usernname is wrong"});
    }
}

const addtoActivity= async function (req,res){
    const token= req.body.token;
    const user= user.find({token:token});
    //extract the user data with this token
}


export {signup,signin} 