const mongoose=require("mongoose")

const blogSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{
    timestamps:true
})

const BlogModel=mongoose.model("blog",blogSchema)

module.exports=BlogModel