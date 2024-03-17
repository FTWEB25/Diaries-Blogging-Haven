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

//http://localhost:8080/blogs?sort=title&order=asc/desc
//http://localhost:8080/blogs?sort=createdAt&order=asc/desc
//http://localhost:8080/blogs?category=${category}
//http://localhost:8080/blogs?limit=3&&skip=1
const getBlogs = async (req, res) => {
  const { page, search = "", category, sort, order = "asc" } = req.query;
  const limit = 2;

  let query = {};
  let sortQuery = {};
  if (search) {
    query.title = new RegExp(search, "i");
  }

  if (category) {
    query.category = category;
  }

  if (sort === "title") {
    sortQuery.title = order === "desc" ? -1 : 1;
  } else if (sort === "createdAt") {
    sortQuery.createdAt = order === "desc" ? -1 : 1;
  }

  try {
    const blogs = await BlogModel.find(query)
      .sort(sortQuery)
      .limit(limit)
      .skip((page - 1) * limit);

    res.status(200).json({ msg: blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};


const updateBlog = async (req, res) => {};
const deleteBlog = async (req, res) => {};


module.exports={createBlog,getBlogs,updateBlog,deleteBlog}