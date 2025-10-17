import express from "express";
// import User from "../models/users.model.js";
// import bcrypt from "bcrypt";
// import httpStatus from "http-status";         //help in generating status code
import wrapAsync from "../utilities/wrapAsync.js";
// import jwt from "jsonwebtoken";
// import { generateToken } from "../utilities/jwt.js";
// import crypto from "crypto";
import { signin,signup } from "../controllers/users.contollers.js";
const router=express.Router();

router.route("/register")
   .post(wrapAsync(signup));

//fn to generate token:-
router.route("/login")
    .post(wrapAsync(signin));


export default router;
