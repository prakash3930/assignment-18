const bcrypt = require('bcrypt');

exports.passwordHash = async (password) => {
    try {
        return  await new Promise((resolve, reject) => {
            bcrypt.genSalt(12,(err,salt)=>{
                if(err){
                    return reject(err)
                }else{
                    bcrypt.hash(password,salt,(err,hash)=>{
                        if(err){
                            return reject(err)
                        }else{
                            return resolve(hash)
                        }
                    })
                }
            })
        }
        );
    } catch (err) {
        console.log(err.message);
    }
};

exports.compareHashPassword = async(password,comparePassword)=>{
    try {
        return await bcrypt.compare(password,comparePassword);
    } catch (err) {
        console.log(err.message);
    }
};