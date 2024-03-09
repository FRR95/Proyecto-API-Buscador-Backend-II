import User from "../models/User.js"


export const GetUsers = async (req, res) => {
   try {

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

