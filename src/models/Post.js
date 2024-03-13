import { Schema, model } from "mongoose"

export const PostSchema = new Schema(
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
        }],
        
        numberOfLikes: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        timestamps: true,
        versionKey: false
    },
)

const Post = model("Post", PostSchema)

export default Post;