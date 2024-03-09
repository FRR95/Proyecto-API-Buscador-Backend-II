import Post from "../models/Post.js"
import User from "../models/User.js"

export const CreatePost = async (req, res) => {
    try {
        const title = req.body.title
        const description = req.body.description
        const userId = req.tokenData.userId

        if (!title || !description) {
            return res.status(404).json({
                sucsess: false,
                message: "Title and description required"
            })
        }

        const postCreated = await Post.
            create({
                title: title,
                description: description,
                userId: userId
            })





        res.status(202).json({
            success: true,
            message: "Post created successfully",
            data: postCreated
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "ERROR",
            error: error.message
        })
    }

}

export const DeletePost = async (req, res) => {
    try {
        const postId = req.params.id
        const userId = req.tokenData.userId

        const findPost = await Post
            .findOne({

                _id: postId,
                userId: userId

            })
        if (!findPost) {
            return res.status(404).json({
                success: false,
                message: "User or post not found",

            })
        }

        const postDeleted = await Post
            .findByIdAndDelete({
                _id: postId
            })

        res.status(201).json({
            success: true,
            message: "Post deleted succesfully",
            data: postDeleted
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "ERROR",
            error: error.message
        })
    }
}

export const UpdatePost = async (req, res) => {
    try {
        const postId = req.params.id
        const userId = req.tokenData.userId
        const title = req.body.title
        const description = req.body.title

        if (!title && !description) {
            return res.status(400).json({
                success: false,
                message: "title or description is needed",

            })
        }

        const findPost = await Post
            .findOne({

                _id: postId,
                userId: userId

            })
        if (!findPost) {
            return res.status(404).json({
                success: false,
                message: "User or post not found",

            })
        }

        const postDeleted = await Post
            .findByIdAndUpdate({
                _id: postId
            },
                {
                    title: title,
                    description: description
                })

        res.status(201).json({
            success: true,
            message: "Post updated succesfully",
            data: postDeleted
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "ERROR",
            error: error.message
        })
    }

}

export const GetUserPosts=async(req,res)=>{
    try {
        const userId=req.tokenData.userId
        const findUserPosts=await Post
        .find({
          userId:userId  
        })
        res.status(202).json({
            success:true,
            message:"User posts retrieved successfully",
            data:findUserPosts
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "ERROR",
            error: error.message
        })
    }
}
export const GetUsersPosts=async(req,res)=>{
    try {
        const findUsersPosts=await Post
        .find()
        res.status(202).json({
            success:true,
            message:"Users posts retrieved successfully",
            data:findUsersPosts
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "ERROR",
            error: error.message
        })
    }
}
export const GetPostById=async(req,res)=>{
    try {
        const postId=req.params.id
        const findPostById=await Post
        .findById({
        _id:postId
        })
        if(!findPostById){
            return res.status(404).json({
                success: false,
                message: "Post not found",
              
            })
        }
        res.status(202).json({
            success:true,
            message:"Post retrieved successfully",
            data:findPostById
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "ERROR",
            error: error.message
        })
    }
}