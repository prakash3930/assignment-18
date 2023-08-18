const { passwordHash, compareHashPassword } = require("../Helpers/userPassBcypt");
const userModel = require("../Models/Auth.model");
const jwt = require("jsonwebtoken");


// user registration system ........
exports.registra = async(req,res)=>{
    try {
        // distracture name email password on body..
        const {name,email,password} = req.body;
        // distracture item validated......
        if(!name){
            return res.status(200).json({status:"fail",message:"name is require"});
        }else if(name.length < 3){
            return res.status(200).json({status:"fail",message:"min length 3 word"});
        }
        const existsName = await userModel.findOne({name});
        if(existsName){
            return res.status(200).json({status:"fail",message:"name is use"});
        }
        if(!email){
            return res.status(200).json({status:"fail",message:"email is require"});
        }
        const exists = await userModel.findOne({email});
        if(exists){
            return res.status(200).json({status:"fail",message:"email is use"});
        }
        if(!password){
            return res.status(200).json({status:"fail",message:"password is require"});
        }else if(password.length < 8){
            return res.status(200).json({status:"fail",message:"min length 8 word"});
        }
        // user password create a hash password....
        const hashPassword = await passwordHash(password);

        // save user data in database.....
        const userData = await new userModel({name,email,password:hashPassword}).save();

        // send res user data...
        res.status(200).json({status:"success",Data:userData});

    } catch (err) { 
        res.status(200).json({status:"fail",message:err.message});
    }
};


// user login system......
exports.login = async(req,res)=>{
    try {
        // distracture email,password on body.....
        const {email,password} = req.body;
        // distracture item validator....
        if(!email){
            return res.status(200).json({status:"fail",message:"email is require"});
        }
        if(!password){
            return res.status(200).json({status:"fail",message:"password is require"});
        }else if(password.length < 8){
            return res.status(200).json({status:"fail",message:"min length 8 word"});
        }
        const exists = await userModel.findOne({email});
        if(!exists){
            return res.status(200).json({status:"fail",message:"user not found."});
        }

        // user password compare hash password....
        const hashPassword = await compareHashPassword(password,exists.password);
        if(!hashPassword){
            return res.status(200).json({status:"fail",message:"email and password is worng."});
        }

        const userObj = {
            name:exists.name,
            email:exists.email
        }

        // create a user jwt token....
        const token = jwt.sign({_id:exists._id},process.env.KEY,{ expiresIn: '5h' });

        // send res user data...
        res.status(200).json({status:"success",userData:userObj,token});

    } catch (err) {
        res.status(200).json({status:"fail",message:err.message});
    }
};



// get a single profile.....
exports.profile = async(req,res)=>{
    try {
        const getSingleProfile = await userModel.findOne({_id:req.userToken._id});

        // send res user data...
        res.status(200).json({status:"success",Data:getSingleProfile});

    } catch (err) {
        res.status(200).json({status:"fail",message:err.message});
    }
};



// update user password.....
exports.password_updatet = async(req,res)=>{
    try {
        // distracture oldpassword,password on body.....
        const {oldPassword,password} = req.body;

        const pass = await userModel.findOne({_id:req.userToken}).select("password")
        if(!oldPassword){
            return res.status(200).json({status:"fail",message:"please give me old password."});
        }
        const hashPassword = await compareHashPassword(oldPassword,pass.password);
        if(!hashPassword){
            return res.status(200).json({status:"fail",message:"old password is worng."});
        }

        const newPassword = await passwordHash(password);

        // update password in data base....
        const updatePassword = await userModel.findByIdAndUpdate({_id:req.userToken._id},{$set:{password:newPassword}},{new: true});
        
       // send res user data...
       res.status(200).json({status:"success",data:updatePassword});

    } catch (err) {
        res.status(200).json({status:"fail",message:err.message});
    }
};


// update user profile.....
exports.profile_update = async (req,res)=>{
    try {
         // distracture email,password,bio,telegram,facebook,twitter,linked,whatsApp on body.....
         const {name,bio,telegram,facebook,twitter,linked,whatsApp} = req.body;

        // distracture item validator....
        if(name){
            if(name.length < 3){
                return res.status(200).json({status:"fail",message:"min length 3 word"});
            }
        };
        if(bio){
            if(bio.length < 10){
                return res.status(200).json({status:"fail",message:"min length 10 word"});
            }
        };

        // update profile in data base....
        const updateProfile = await userModel.findByIdAndUpdate({_id:req.userToken._id},{$set:{name,bio,telegram,facebook,twitter,linked,whatsApp}},{new: true});

        // send res user data...
        res.status(200).json({status:"success",data:updateProfile});

    } catch (err) {
        res.status(200).json({status:"fail",message:err.message});
    }
};