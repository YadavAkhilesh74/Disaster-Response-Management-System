import User from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req,res)=>{
    try{
       
        const {name,email,password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        
 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message:"User registered successfully",user
        });

    }catch(error){
        res.status(500).json({
            message:`Server error: ${error.message}`
        });
    }
};


export const loginUser = async (req,res) =>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json({
                message:"Invalid credentials",
            });
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid credentials",
            });
        }

        const token = jwt.sign(
            {
            userId:user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"7d",
        }
    );

        res.status(200).json({
            message:"User logged in successfully",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            },
        });

        
    }catch(error){
        res.status(500).json({
            message:`Server Error: ${error.message}`,
        });
    }
};

export const getProfile =async (req,res)=>{
    res.status(200).json({
        message:"Protected routed access",
    });
};
