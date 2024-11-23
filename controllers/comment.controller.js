import { Comment } from "../models/comment.model.js"

const createComment = async(req,res)=>{
    const {author,postId,content} = req.body
    if ([author, postId, content].some(field => !field || field.trim() === "")) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const response = await Comment.create({author,post : postId,content})
        if (!response) {
            return res.status(500).json({ message: "Failed to create comment" });
        }
        res.status(201).json({ data: response, message: "Comment created successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while creating the comment" });
    }
}

export {createComment}