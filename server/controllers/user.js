import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try  {
        const existingUser = await User.findOne({email});
        
        if( !existingUser ) return res.status(200).json({message: "User doesn't exist.",success:false});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(200).json({message: "Invalid credentials",success:false});

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"});

        res.status(200).json({result: existingUser, token,success:true});

        }catch(error){
            res.status(200).json({message: "Something went Wrong",success:false});
    }
}

export const signup = async (req, res) => {
    const {email, password, confirmPassword, firstName, lastName} = req.body;

    try{
        const existingUser = await User.findOne({email});

        if(existingUser){
            console.log("user alredy tehrer");
            return res.status(200).json({ message: "User already exists."});
            // return res.status(400).end("alredy exists");
        } 

        if(password !== confirmPassword) return res.status(400).json({message: " Passwords doesn't match"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`});

        const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: "1h"});

        res.status(200).json({result, token});
    }
    catch(error){
        res.status(500).json({message: "Something went Wrong"});
    }
    
}