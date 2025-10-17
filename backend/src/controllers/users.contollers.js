import express from "express";
import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import httpStatus from "http-status";         //help in generating status code
import crypto from "crypto";
import { generateToken } from "../utilities/jwt.js";
const signup= async function (req,res){
  
    let {userName,password}= req.body;
    const data= await User.find({userName:userName});        //returns an array
    if(data.length!==0){
        res.status(httpStatus.FOUND).json({message:"User already Registered"});
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

        res.status(httpStatus.CREATED).json({message:"User Created"});
    }
}

const signin =async function (req,res){
    //console.log(req.body);
    let userName= req.body.userName;
    let password= req.body.password;
    if(!userName || !password){
        return res.status(400).json({messgae:"please provide required information"});
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
            console.log("updated")
        })
        
        const jwtoken=generateToken(user);


        
        res.status(httpStatus.OK).json({jwtoken,message: "logged in succesfully",token:user.token});
    }
    else{
        res.status(httpStatus.BAD_REQUEST).json({message: "Either Passowrd or Usernname is wrong"});
    }
}



export {signup,signin} 