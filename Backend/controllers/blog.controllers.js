const BlogModel = require("../models/blog.model");

const createBlog = async (req, res) => {
    const {title,category,description}=req.body
    try {
       if(!title||!category||!description||!req.file){
        return res.status(400).json({msg:"Please provide all the fields"})
       }
       const blog=new BlogModel({
        title,
        image:req.file.filename,
        category,
        description,
        userId:req.user._id
       })
       await blog.save()
       return res.status(200).json({msg:"Blog Created Successfully",createdBlog:blog})
    } catch (error) {
       console.error("Error in blog creation:", error);
       return res.status(500).json({ msg: "Internal server error." }); 
    }
};


const getBlogs = async (req, res) => {};
const updateBlog = async (req, res) => {};
const deleteBlog = async (req, res) => {};


module.exports={createBlog,getBlogs,updateBlog,deleteBlog}