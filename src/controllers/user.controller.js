import User from "../models/User.js"
import { handleError } from "../utils/handleError.js";


export const GetUsers = async (req, res) => {
    try {
        const { email } = req.query

        if (email) {

            const usersfiltered = await User
                .find({

                    email: Like("%"+email+"%")

                })
                .select('-password')

            return res.status(201).json(
                {
                    success: true,
                    message: "Users retrieved succesfully",
                    data: usersfiltered
                }
            )
        }

        const users = await User
            .find()
            .select('-password')

        res.status(201).json(
            {
                success: true,
                message: "Users retrieved succesfully",
                data: users
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "ERROR",
                error: error.message
            }
        )
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.tokenData.userId
        const userProfile = await User
            .findById({
                _id: userId
            })

        res.status(201).json({
            success: true,
            message: "User profile retrieved succesfully",
            data: userProfile
        })

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "ERROR",
                error: error.message
            }
        )
    }
}

export const UpdateUserProfile = async (req, res) => {
    try {
        const userId = req.tokenData.userId
        const email = req.body.email
        const name = req.body.name

        const userUpdated = await User
            .findByIdAndUpdate(
                {
                    _id: userId
                },
                {
                    email: email,
                    name:name
                }
            )

        res.status(202).json({
            success: true,
            message: "User profile updated successfully",
            data: userUpdated
        })
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "ERROR",
                error: error.message
            }
        )
    }
}

export const DeleteUser = async (req, res) => {
    try {
        const UserId = req.params.id

        const findUser = await User
        .findById({
            _id:UserId
        })

        if(findUser.role==="admin"){
            throw new Error('You cannot kill god')
        }

        const userDeleted = await User
            .findByIdAndDelete({
                _id: UserId
            })

        if (!userDeleted) {
            throw new Error('User not found')
        }
        res.status(201).json({
            success: true ,
            message: "User deleted succesfully",
            data: userDeleted
        })
    } catch (error) {
        if (error.message === 'User not found') {
            return handleError(res, error.message, 400)
        }
        if (error.message === 'You cannot kill god') {
            return handleError(res, error.message, 400)
        }
        handleError(res, "ERROR", 500)
    }

}
export const UpdateUserProfileInfo = async (req, res) => {
    try {
        const userId = req.params.id
        const name = req.body.name

        const userUpdated = await User
            .findByIdAndUpdate(
                {
                    _id: userId
                },
                {
                    name:name
                }
            )

        res.status(202).json({
            success: true,
            message: "User profile updated successfully",
            data: userUpdated
        })
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "ERROR",
                error: error.message
            }
        )
    }
}

export const UpdateUserRole = async (req, res) => {
    try {
        const userRole = req.body.userRole
        const UserId = req.params.id

        if (!userRole) {
            throw new Error('User Role is required')
        }
        const findUser = await User
            .findById(
                {
                    _id: UserId
                }
            )

        if (!findUser) {
            throw new Error('User not found')
        }
        const userRoleUpdated = await User
            .findByIdAndUpdate(
                {
                    _id: UserId
                },
                {
                    role: userRole
                }
            )
        res.status(201).json({
            success: true,
            message: "User role updated succesfully",
            data: userRoleUpdated
        })

    } catch (error) {
        if (error.message === 'User Role is required') {
            return handleError(res, error.message, 400)
        }
        if (error.message === 'User not found') {
            return handleError(res, error.message, 400)
        }
        handleError(res, "ERROR", 500)
    }
}

export const FollowUnfollowUser = async (req, res) => {
    try {
        const userId = req.params.id
        const ownUserId = req.tokenData.userId

        const findUserId = await User
            .findById(
                {
                    _id: userId
                }
            )

        if (!findUserId) {
            throw new Error('User not found')
        }

        const findUserIdToFollow = await User
            .findOne(
                {
                    _id: userId,
                    followers: ownUserId
                }
            )
        const findMyUserIdToFollowing = await User
            .findOne(
                {
                    _id: ownUserId,
                 

                }
            )

        if (!findUserIdToFollow) {
            findUserId.followers.push(ownUserId)
            findMyUserIdToFollowing.following.push(userId)
            await findUserId.save()
            await findMyUserIdToFollowing.save()

            return res.status(201).json({
                success: true,
                message: "User Followed Successfully",
            })
        }
        if (findUserIdToFollow) {
            for (let i = 0; i < findUserId.followers.length; i++) {
                if (findUserId.followers[i].toString() === `${ownUserId}`) {
                    findUserId.followers.splice(i, 1)
                    await findUserId.save();

                }
            }
            for (let i = 0; i < findMyUserIdToFollowing.following.length; i++) {
                if (findMyUserIdToFollowing.following[i].toString() === `${userId}`) {
                    findMyUserIdToFollowing.following.splice(i, 1)
                    await findMyUserIdToFollowing.save();
                }
            }

            return res.status(201).json({
                success: true,
                message: "User UnFollowed Successfully",
            })
        }

    } catch (error) {
        if (error.message === 'User not found') {
            return handleError(res, error.message, 400)
        }
        handleError(res, "ERROR", 500)
    }
}