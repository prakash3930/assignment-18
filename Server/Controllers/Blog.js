const {readFileSync} = require('fs');
const blogModel = require('../Models/Blog.model');
const slug = require('slugify');




// blog create.....
exports.blogCreate = async(req,res)=>{
    try {
        // distracture name email password on body..
        const {title,content,author} = req.fields;
        const {photo} = req.files;
        
        // distracture item validator..
        if(!title){
            return res.status(200).json({status:"fail",message:"title is require"});
        }else if(title.length < 3){
            return res.status(200).json({status:"fail",message:"min length 3 word"});
        }
        if(!content){
            return res.status(200).json({status:"fail",message:"content is require"});
        }else if(content.length < 10){
            return res.status(200).json({status:"fail",message:"min length 10 word"});
        }
        if(!author){
            return res.status(200).json({status:"fail",message:"author is require"});
        }
        if(!photo){
            return res.status(200).json({status:"fail",message:"photo is require"});
        }else if(photo.size > 200000){
            return res.status(200).json({status:"fail",message:"min photo size 2mb."});
        }

        // blog content save in data base....
        const blogCreate = await new blogModel({...req.fields,slug:slug(title),photo:{data:readFileSync(photo.path),contentType:photo.type}}).save();

        // send res product data...
        res.status(200).json({status:"success",message:blogCreate});

    } catch (err) {
        res.status(200).json({status:"fail",message:err.message});
    }
};


// blog-update.....
exports.blog_update = async(req,res)=>{
    try {
         // distracture name email password on body..
         const {title,content,author} = req.fields;
         const {photo} = req.files;
         const {id} = req.params;

        // distracture item validator....
        if(title){
            if(title.length < 3){
                return res.status(200).json({status:"fail",message:"min length 3 word"});
            }
        };
        if(content){
            if(content.length < 10){
                return res.status(200).json({status:"fail",message:"min length 10 word"});
            }
        };
        
        if(photo){
            if(photo.size > 200000){
                return res.status(200).json({status:"fail",message:"min photo size 2mb."});
            }
        };

        const sluge = await blogModel.findOne({_id:id}).select("title");
        
        // update a blog post.....
        const updateSingleBlog = await blogModel.findByIdAndUpdate({_id:id},{$set:{...req.fields,slug:slug(title?title:sluge.title),photo:{data:readFileSync(photo.path),contentType:photo.type}}},{new: true});

        // send res product update data...
        res.status(200).json({status:"success",message:updateSingleBlog});

    } catch (err) {
        res.status(200).json({status:"fail",message:err.message});
    }
};



// blog-delete.....
exports.blog_delete = async(req,res)=>{
    try {
         // distracture id....
         const {id} = req.params;

        // delete a blog post.....
        const deleteSingleBlog = await blogModel.findOneAndDelete({_id:id},{new: true});

        // send res product delete data...
        res.status(200).json({status:"success",message:deleteSingleBlog});

    } catch (err) {
        res.status(200).json({status:"fail",message:err.message});
    }
};




// get a all blog....
exports.getBlog = async(req,res)=>{
    try {
        // distracture page....
        const {page} = req.params;
        const limit = 12;
        const pages = page?page:1;

        // get a blog.....
        const getAllBlog = await blogModel.find().sort({createdAt:-1}).skip((pages - 1)*limit).limit(12).select("-photo");
        const coutBlogData = await blogModel.find({}).countDocuments();

        res.status(200).json({status:"success",total_product:coutBlogData,product:getAllBlog,Note:"Please inter the page number in the url and views more product."});

    } catch (err) {
        res.status(200).json({status:"fail",message:err.message});
    }
};


// blog search by keyword..
exports.blogSearch = async(req,res)=>{
    try {
        // distracture search keyword in req.body.....
        const {keyword} = req.body;
        if(!keyword){
            return res.status(200).json({status:"fail",message:"search bar in empty."});
        }

        // search blog by keyword...
        const singleBlog = await blogModel.find({
            $or:[
                {title:{$regex:keyword,$options:'i'}},
                {content:{$regex:keyword,$options:'i'}},
                {author:{$regex:keyword,$options:"i"}}
            ]
        }).select('-photo');

        // how many blog find....
        const finded = singleBlog.length;

        // send res blog data...
        res.status(200).json({status:"success",find_product:finded,product:singleBlog});

    } catch (err) {
        res.status(200).json({status:'fail',message:err.message});
    }
};




// get a single blog....
exports.singleBlog = async(req,res)=>{
    try {
        const getSingleBlog = await blogModel.findOne({_id:req.params.id}).select("-photo");

        // send res blog data...
        res.status(200).json({status:"success",Data:getSingleBlog});
    } catch (err) {
        res.status(200).json({status:'fail',message:err.message});
    }
};