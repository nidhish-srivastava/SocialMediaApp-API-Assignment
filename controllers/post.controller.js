import { Post } from "../models/post.model.js";

const createPost = async (req, res) => {
    const { content, image, author } = req.body

    // sanitize the user input
    if ([content, author].some((field) => field?.trim() === "")) {
        return res.status(400).json({ message: "All fields are required" })
    }

    try {
        const response = await Post.create({ content, image, author })
        if (!response) {
            return res.status(500).json({ message: "Failed to create post" })
        }
        res.status(201).json({message: "Post created successfully" })
    } catch (error) {
        res.status(500).json({ message: "An error occurred while creating the post" })
    }
}

const listAllPosts = async (req, res) => {
    const { page = 1, limit = 10 } = req.query  // default values for page and limit
    const skip = (page - 1) * limit

    try {
        const response = await Post.find().skip(skip).limit(limit)
        res.status(200).json({ data: response, message: "All posts fetched successfully" })
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching posts" })
    }
}

export { createPost, listAllPosts };
