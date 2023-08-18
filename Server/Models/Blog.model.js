const mongoose  = require('mongoose');
const {Schema,model} = mongoose;
const today = new Date();
// console.log(today.toDateString());
// user Schema create ...
const BlogSchema = new Schema(
    {
        title:{
            type:String,
            trim: true,
            required: [true,"Title is require"],
            minlength:[3,"Min length 3 word"]
        },
        slug:{
            type: String,
            trim: true,
            required:[true,"slug is required."]
        },
        content:{
            type:String,
            trim: true,
            required: [true,"content is require"],
            minlength:[8,"Min length 8 word"]
        },
        author:{
            type:String,
            trim: true,
            required: [true,"author is require"]
        },
        photo:{
            contentType: String,
            data: Buffer
        },
        presentData:{
            type:Date,
            trim: true,
            default:today.toDateString()
        }
    },
    {timestamps: true, versionKey: false}
);

// create a model .....
const blogModel = model("Blog",BlogSchema);

// exports.
module.exports = blogModel;