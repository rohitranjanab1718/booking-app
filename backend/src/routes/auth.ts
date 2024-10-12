import express, { Request,Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { check,validationResult } from "express-validator";
import User from "../model/user";
import verifyToken from "../middleware/auth";
const router = express.Router();

router.post("/login",
    check("email","email is not valid").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
        min: 6,
      }),
    async(req:Request,res:Response)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({ message: errors.array() });
        }  
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({message:"user not found"});
        }
        const isMatch = bcrypt.compare(password,user.password);
        if (!isMatch){
            return res.status(400).json({message:"password is not correct"})
        }
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY as string,
            {
              expiresIn: "1d",
            }
          );
          res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
          });
          res.status(200).json({ userId: user._id });
    }
)

router.get("/validate-token",verifyToken,async(req:Request,res:Response)=>{
    res.status(200).send({ userId: req.userId });
})

router.post("/logout",async(req:Request,res:Response)=>{
    res.cookie("auth_token", "", {
        expires: new Date(0),
      });
    res.send();
})

export default router;