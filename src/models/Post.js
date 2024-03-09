import { Schema, model } from "mongoose"

export const UserSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
           
        },

        userId: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        timestamps: true,
        versionKey: false
    },
)

const Post = model("Post", UserSchema)

export default Post;