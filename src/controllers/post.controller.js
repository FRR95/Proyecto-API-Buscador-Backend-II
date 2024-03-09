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
                userId:userId
            })

    

    

        res.status(202).json({
            success:true,
            message:"Post created successfully",
            data:postCreated
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "ERROR",
            error: error.message
        })
    }

}