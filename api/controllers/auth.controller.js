import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
    try{
    const {username, email,password}=req.body;

    if(!username || !email || !password || username=="" || email=="" || password==""){
        return res.status(400).json({message:"All fields are required"});
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
    return res.status(500).json({message:err.message})
}
}