import User from "../models/User.js"


export const GetUsers = async (req, res) => {
    try {
        const { email } = req.query 

        if (email) {

            const usersfiltered = await User
                .find({

                    email: email

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

        const userUpdated = await User
            .findByIdAndUpdate(
                {
                    _id: userId
                },
                {
                    email: email
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