import { Post } from "../models/post.model.js";

const createPost = async (req, res) => {
    //  #swagger.tags=['Create Post']
    //  #swagger.description='Endpoint to create a new post'
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Post details',
            required: true,
            schema: {
                type: 'object',
                properties: {
                    content: { type: 'string', example: 'This is a new post' },
                    image: { type: 'string', example: 'http://example.com/image.jpg', nullable: true },
                    author: { type: 'string', example: 'John Doe' }
                }
            }
        }
    */
    /*  #swagger.responses[201] = {
            description: 'Post created successfully',
            schema: { message: 'Post created successfully' }
        }
    */
    /*  #swagger.responses[400] = {
            description: 'Bad Request',
            schema: { message: 'All fields are required' }
        }
    */
    /*  #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'An error occurred while creating the post' }
        }
    */
    const { content, image, author } = req.body;

    if ([content, author].some((field) => field?.trim() === "")) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const response = await Post.create({ content, image, author });
        if (!response) {
            return res.status(500).json({ message: "Failed to create post" });
        }
        res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while creating the post" });
    }
};

const listAllPosts = async (req, res) => {
    //  #swagger.tags=['List all posts']
    //  #swagger.description='Endpoint to list all posts with pagination'
    /*  #swagger.parameters['page'] = {
            in: 'query',
            description: 'Page number',
            required: false,
            type: 'integer',
            example: 1
        }
    */
    /*  #swagger.parameters['limit'] = {
            in: 'query',
            description: 'Number of posts per page',
            required: false,
            type: 'integer',
            example: 10
        }
    */
    /*  #swagger.responses[200] = {
            description: 'All posts fetched successfully',
            schema: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            _id: { type: 'string', example: '605c72efb7c9242208cd8b84' },
                            content: { type: 'string', example: 'This is a new post' },
                            image: { type: 'string', example: 'http://example.com/image.jpg', nullable: true },
                            author: { type: 'string', example: 'John Doe' },
                            createdAt: { type: 'string', example: '2024-11-23T10:20:30Z' },
                            updatedAt: { type: 'string', example: '2024-11-23T10:20:30Z' }
                        }
                    }
                },
                message: { type: 'string', example: 'All posts fetched successfully' }
            }
        }
    */
    /*  #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'An error occurred while fetching posts' }
        }
    */
    const { page = 1, limit = 10 } = req.query;  // default values for page and limit
    const skip = (page - 1) * limit;

    try {
        const response = await Post.find().skip(skip).limit(limit);
        res.status(200).json({ data: response, message: "All posts fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching posts" });
    }
};

export { createPost, listAllPosts };
