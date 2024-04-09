import Post from "../models/Post.js"
import User from "../models/User.js"
import { handleError } from "../utils/handleError.js";

export const CreatePost = async (req, res) => {
    try {
        const title = req.body.title
        const description = req.body.description
        const userId = req.tokenData.userId

        if (!title || !description) {

            throw new Error('Title and description required')
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
        if (error.message === 'Title and description required') {
            return handleError(res, error.message, 400)
        }
        handleError(res, "ERROR", 500)
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

            throw new Error('User or post not found')
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
        if (error.message === 'User or post not found') {
            return handleError(res, error.message, 400)
        }
        handleError(res, "ERROR", 500)
    }
}

export const UpdatePost = async (req, res) => {
    try {
        const postId = req.params.id
        const userId = req.tokenData.userId
        const title = req.body.title
        const description = req.body.description

        if (!title && !description) {
            throw new Error('title or description is needed')
        }

        const findPost = await Post
            .findOne({

                _id: postId,
                userId: userId

            })
        if (!findPost) {
            throw new Error('User or post not found')
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
        if (error.message === 'title or description is needed') {
            return handleError(res, error.message, 400)
        }
        if (error.message === 'User or post not found') {
            return handleError(res, error.message, 400)
        }
        handleError(res, "ERROR", 500)
    }

}

export const GetUserPosts = async (req, res) => {
    try {
        const userId = req.tokenData.userId
        const findUserPosts = await Post
            .find({
                userId: userId
            })
        res.status(202).json({
            success: true,
            message: "User posts retrieved successfully",
            data: findUserPosts
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "ERROR",
            error: error.message
        })
    }
}
export const GetUsersPosts = async (req, res) => {
    try {
        const findUsersPosts = await Post
            .find()
            .populate({
                path:"userId",
                select:"name"})


        res.status(202).json({
            success: true,
            message: "Users posts retrieved successfully",
            data: findUsersPosts
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "ERROR",
            error: error.message
        })
    }
}
export const GetPostById = async (req, res) => {
    try {
        const postId = req.params.id
        const findPostById = await Post
            .findById({
                _id: postId
            })
        if (!findPostById) {
            throw new Error('Post not found')
        }
        res.status(202).json({
            success: true,
            message: "Post retrieved successfully",
            data: findPostById
        })
    } catch (error) {
        if (error.message === 'Post not found') {
            return handleError(res, error.message, 400)
        }
        handleError(res, "ERROR", 500)
    }
}
export const GetPostsByUserId = async (req, res) => {
    try {
        const userId = req.params.id
        const findUser = await User
            .findById({
                _id: userId
            })
        if (!findUser) {
            throw new Error('User not found')
        }
        const findUserPosts = await Post
            .find({
                userId: userId
            })
        res.status(202).json({
            success: true,
            message: "Post retrieved successfully",
            data: findUserPosts
        })
    } catch (error) {
        if (error.message === 'User not found') {
            return handleError(res, error.message, 400)
        }
        handleError(res, "ERROR", 500)
    }
}

export const LikeUnlikeThePost = async (req, res) => {
    try {
        const postId = req.params.id
        const userId = req.tokenData.userId

        const findPost = await Post
            .findById({
                _id: postId
            })

        if (!findPost) {
            throw new Error('Post not found')
        }
        const findUser = await Post
            .findOne({
                _id: postId,
                numberOfLikes: userId
            })

        if (!findUser) {
            findPost.numberOfLikes.push(userId);
            await findPost.save();

            return res.status(201).json({
                success: true,
                message: "Post liked succesfully",
            })
        }
        if (findUser) {

            for (let i = 0; i < findPost.numberOfLikes.length; i++) {
                if (findPost.numberOfLikes[i].toString() === `${userId}`) {
                    findPost.numberOfLikes.splice(i, 1)
                    await findPost.save();

                }
            }

            return res.status(201).json({
                success: true,
                message: "Post remove from like succesfully",
            })
        }


    } catch (error) {
        if (error.message === 'Post not found') {
            return handleError(res, error.message, 400)
        }
        handleError(res, error.message, 500)
    }
}

export const GetFollowingUsersPosts = async (req, res) => {
    try {
        const userId = req.tokenData.userId

        const findUser = await User
            .findById({
                _id: userId
            })

        const getPosts = await Post.find({ userId: { $in: (findUser.following) } })
            .populate({
                path:"userId",
                select:"email"})





        return res.status(201).json({
            success: true,
            message: "Following users posts retrieved successfully",
            data: getPosts

        })

    } catch (error) {
        if (error.message === 'User not found') {
            return handleError(res, error.message, 400)
        }
        handleError(res, error.message, 500)
    }
}