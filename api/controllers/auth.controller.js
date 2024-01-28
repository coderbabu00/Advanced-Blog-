import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";  

export const signup = async (req, res, next) => {
    try{
    const {username, email,password}=req.body;

    if(!username || !email || !password || username=="" || email=="" || password==""){
        // return res.status(400).json({message:"All fields are required"});
        // or
        next(errorHandler(400, "All fields are required"));
    }

    //Hashing password
     const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        email,
        password:hashedPassword
    })
    await newUser.save();
    return res.status(201).json({message:"User created successfully"})
}catch(err){
    // res.status(500).json({message:err.message});
    // or 
    next(err);
}
}

export const signin = async (req, res, next) => {
    try{
    const {email, password}=req.body;

    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
      }

      const validUser = await User.findOne({ email });
      if (!validUser) {
        return next(errorHandler(404, 'User not found'));
      }
      const validPassword = bcrypt.compare(password, validUser.password);
      if (!validPassword) {
        return next(errorHandler(400, 'Invalid password'));
      }
      const token = jwt.sign(
        { id: validUser._id, isAdmin: validUser.isAdmin },
        process.env.JWT_SECRET
      );
  
      const { password: pass, ...rest } = validUser._doc;
  
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }catch(err){
        next(err);
    }
}