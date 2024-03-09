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

export const DeleteUser = async (req, res) => {
    try {
        const UserId = req.params.id

        const userDeleted = await User
            .findByIdAndDelete({
                _id: UserId
            })

        if (!userDeleted) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(201).json({
            success: false,
            message: "User deleted succesfully",
            data: userDeleted
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
            return res.status(500).json(
                {
                    success: false,
                    message: "User Role is required"
                }
            )
        }
        const findUser = await User
            .findById(
                {
                    _id: UserId
                }
            )

        if (!findUser) {
            return res.status(500).json(
                {
                    success: false,
                    message: "User not found"
                }
            )
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
        res.status(500).json(
            {
                success: false,
                message: "ERROR",
                error: error.message
            }
        )
    }
}