const jwt = require('jsonwebtoken');

exports.verifyRegistar = async(req,res,next)=>{
    try {
        const {token} = req.headers;
        if(!token){
            return res.status(200).json({status:"fail",message:"Login Your Account."});
        }

        const verify = jwt.verify(token,process.env.KEY);

        req.userToken = verify;
        next();

    } catch (err) {
        res.status(200).json({status:"fail",message:err.message});
    }
};