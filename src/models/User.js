import { Schema, model } from "mongoose"

export const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,

        },
        role: {
            type: String,
            enum: ["user", "admin", "super_admin"],
            default: "user"
        },

        following: [
            {
              type: Schema.Types.ObjectId,
              ref: "User",
              default: [],
            },
          ],
          followers: [
            {
              type: Schema.Types.ObjectId,
              ref: "User",
              default: [],
            },
          ],
    },
    {
        timestamps: true,
        versionKey: false
    },
)

const User = model("User", UserSchema)

export default User;