import express from "express";
import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import httpStatus from "http-status";

const router=express.Router();

router.post("/register",async (req,res)=>{
  try{
    //console.log(req.body);
    
    let {username,password}= req.body;
    const data= await User.find({userName:username});        //returns an array
    if(data.length!==0){
        res.status(httpStatus.FOUND).json({message:"User already Registered"});
    }
    else{
        const saltRounds=10;
        const hash=await bcrypt.hash(password,saltRounds);
        //console.log(hash);
        let newUser= new User({

            name:req.body.name,
            userName: req.body.username,
            password: hash,

        });

        await newUser.save().then(()=>{
            console.log("saved");
        });

        res.status(httpStatus.CREATED).json({message:"User Creted"});
    }
   }
   catch(err){
     console.log(err);
     res.status(httpStatus.BAD_REQUEST).json({err : "error has occured"});
   }
})

export default router;
