const express=require("express")
const { createBlog, getBlogs, updateBlog, deleteBlog } = require("../controllers/blog.controllers")
const auth = require("../middlewares/auth.middleware")
const upload = require("../config/multer"); 

const blogRouter=express.Router()

blogRouter.use("/images", express.static("images"));

blogRouter.post("/create",auth,upload.single("image"),createBlog)
blogRouter.get("/",getBlogs)
blogRouter.patch("/:id",updateBlog)
blogRouter.delete("/:id",deleteBlog)

module.exports=blogRouter