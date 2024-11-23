import { Comment } from "../models/comment.model.js";

const createComment = async (req, res) => {
  //  #swagger.tags=['Create Comment']
    //  #swagger.description='Endpoint to create a new comment on a post'
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Comment details',
            required: true,
            schema: {
                type: 'object',
                properties: {
                    author: { type: 'string', example: 'John Doe' },
                    postId: { type: 'string', example: '605c72efb7c9242208cd8b82' },
                    content: { type: 'string', example: 'This is a comment' }
                }
            }
        }
    */
    /*  #swagger.responses[201] = {
            description: 'Comment created successfully',
            schema: {
                message: 'Comment created successfully'
            }
        }
    */
    /*  #swagger.responses[400] = {
            description: 'Bad Request',
            schema: { message: 'All fields are required' }
        }
    */
    /*  #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'An error occurred while creating the comment' }
        }
    */
    const { author, postId, content } = req.body;
    if ([author, postId, content].some(field => !field || field.trim() === "")) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const response = await Comment.create({ author, post: postId, content });
        if (!response) {
            return res.status(500).json({ message: "Failed to create comment" });
        }
        res.status(201).json({ message: "Comment created successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while creating the comment" });
    }
}

export { createComment };
