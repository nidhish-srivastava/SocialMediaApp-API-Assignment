import { User } from "../models/user.model.js";

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        // sanitize the user input
        if (
            [name, email, password].some((field) => field?.trim() === "")
        ) {
            return res.status(400).json({message : "All fields are required"})
        }

        const existedUser = await User.findOne({email})
        if (existedUser) {
            return res.status(400).json({message : "User account already exists"})
        }
        const newUser = await User.create({ name, email, password })
        if (!newUser) {
            return res.status(500).json({message : "Error creating new account"})
        }
        res.status(201).json({message : "Account created successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Error creating new account"})
    }
}

const login = async (req,res) => {
    const { email, password } = req.body
    if (!email && !password) {
        return res.status(400).json({message : "Email or password is missing"})
    }
    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({message : "User account doesn't exist"})
        }
        const isPasswordValid = await user.isPasswordCorrect(password)
        if (!isPasswordValid) {
            return res.status(400).json({message : "Invalid password"})
        }
        const accessToken = await user.generateAccessToken()
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'None' // Required for cross-site cookies
        };
        res.status(200).cookie("accessToken", accessToken, options).json({message : "User logged in successfully"})
    }
    catch (error) {
        res.status(500).json({message : "Error while logging in"})
    }
}

const logout = async (req, res) => {
    try {
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'None' // Required for cross-site cookies
        }
        res.status(200).clearCookie("accessToken", options).json({message : "User logged Out"})
    } catch (error) {
        res.status(500).json({message : "Error during log out"})
    }
}

const currentUser = async(req,res)=>{
    try {
        res.json({data : req.user,message : "Current user info fetched successfully"})
    } catch (error) {
        res.status(500).json({message : "Error fetching logged in user info"})
    }
}


export { login, register, logout, currentUser }