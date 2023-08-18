const mongoose  = require('mongoose');
const {Schema,model} = mongoose;

// user Schema create ...
const userSchema = new Schema(
    {
        name:{
            type:String,
            trim: true,
            unique: true,
            required: [true,"Name is require"],
            minlength:[3,"Min length 3 word"]
        },
        email:{
            type:String,
            trim: true,
            unique: true,
            required: [true,"Email is require"], 
            isEmail: true
        },
        password:{
            type:String,
            trim: true,
            required: [true,"Password is require"],
            minlength:[8,"Min length 8 word"]
        },
        role:{
            type:Number,
            trim: true,
            default:0
        },
        bio:{
            type: String,
            trim: true,
            default:""
        },
        telegram:{
            type: String,
            trim: true,
            default:""
        },
        facebook:{
            type: String,
            trim: true,
            default:""
        },
        twitter:{
            type: String,
            trim: true,
            default:""
        },
        linked:{
            type: String,
            trim: true,
            default:""
        },
        whatsApp:{
            type: String,
            trim: true,
            default:""
        }
    },
    {timestamps: true, versionKey: false}
);

// create a model .....
const userModel = model("registar",userSchema);

// exports.
module.exports = userModel;