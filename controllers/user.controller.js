import { User } from "../models/user.model.js";

const register = async (req, res) => {
    //  #swagger.tags=['Create account']
    //  #swagger.description='Endpoint to register a new user'
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'User details for registration',
            required: true,
            schema: {
                type: 'object',
                properties: {
                    name: { type: 'string', example: 'John Doe' },
                    email: { type: 'string', example: 'john.doe@example.com' },
                    password: { type: 'string', example: 'password123' }
                }
            }
        }
    */
    /*  #swagger.responses[201] = {
            description: 'Account created successfully',
            schema: { message: 'Account created successfully' }
        }
    */
    /*  #swagger.responses[400] = {
            description: 'Bad Request',
            schema: { message: 'All fields are required' }
        }
    */
    /*  #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'Error creating new account' }
        }
    */
    try {
        const { name, email, password } = req.body
        // sanitize the user input
        if (
            [name, email, password].some((field) => field?.trim() === "")
        ) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const existedUser = await User.findOne({ email })
        if (existedUser) {
            return res.status(400).json({ message: "User account already exists" })
        }
        const newUser = await User.create({ name, email, password })
        if (!newUser) {
            return res.status(500).json({ message: "Error creating new account" })
        }
        res.status(201).json({ message: "Account created successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating new account" })
    }
}

const login = async (req, res) => {
    //  #swagger.tags=['Login']
    //  #swagger.description='Endpoint to log in a user'
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'User login details',
            required: true,
            schema: {
                type: 'object',
                properties: {
                    email: { type: 'string', example: 'john.doe@example.com'},
                    password: { type: 'string', example: 'password123' }
                }
            }
        }
    */
    /*  #swagger.responses[200] = {
            description: 'User logged in successfully',
            schema: { message: 'User logged in successfully' }
        }
    */
    /*  #swagger.responses[400] = {
            description: 'Bad Request',
            schema: { message: 'Email or password is missing' }
        }
    */
    /*  #swagger.responses[401] = {
            description: 'Unauthorized',
            schema: { message: 'Invalid password' }
        }
    */
    /*  #swagger.responses[404] = {
            description: 'Not Found',
            schema: { message: 'User account doesn\'t exist' }
        }
    */
    /*  #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'Error while logging in' }
        }
    */
    const { email, password } = req.body
    if (!email && !password) {
        return res.status(400).json({ message: "Email or password is missing" })
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User account doesn't exist" })
        }
        const isPasswordValid = await user.isPasswordCorrect(password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" })
        }
        const accessToken = await user.generateAccessToken()
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'None' // Required for cross-site cookies
        };
        res.status(200).cookie("accessToken", accessToken, options).json({ message: "User logged in successfully" })
    }
    catch (error) {
        res.status(500).json({ message: "Error while logging in" })
    }
}

const logout = async (req, res) => {
    //  #swagger.tags=['Logout']
    //  #swagger.description='Endpoint to log out a user'
    /*  #swagger.responses[200] = {
            description: 'User logged out successfully',
            schema: { message: 'User logged Out' }
        }
    */
    /*  #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'Error during log out' }
        }
    */
    try {
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'None' // Required for cross-site cookies
        }
        res.status(200).clearCookie("accessToken", options).json({ message: "User logged Out" })
    } catch (error) {
        res.status(500).json({ message: "Error during log out" })
    }
}

const currentUser = async (req, res) => {
    //  #swagger.tags=['Logged in User']
    //  #swagger.description='Endpoint to fetch the currently logged in user information'
    /*  #swagger.responses[200] = {
            description: 'Current user info fetched successfully',
            schema: {
                data: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', example: '605c72efb7c9242208cd8b82' },
                        name: { type: 'string', example: 'John Doe' },
                        email: { type: 'string', example: 'john.doe@example.com' }
                    }
                },
                message: { type: 'string', example: 'Current user info fetched successfully' }
            }
        }
    */
    /*  #swagger.responses[500] = {
            description: 'Internal Server Error',
            schema: { message: 'Error fetching logged in user info' }
        }
    */
    try {
        res.json({ data: req.user, message: "Current user info fetched successfully" })
    } catch (error) {
        res.status(500).json({ message: "Error fetching logged in user info" })
    }
}


export { login, register, logout, currentUser }