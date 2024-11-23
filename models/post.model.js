import { model, Schema } from "mongoose";

const postSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
}
)

export const Post = model("Post", postSchema)