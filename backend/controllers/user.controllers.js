import { User } from "../models/user.models.js";
import bcrypt from 'bcrypt'


// SignUp
const signUp = async (req, res) => {
    const { userName, fullName, password } = req.body;


    // Check if all required fields are provided.
    if (!userName || !fullName || !password) {
        return res.status(400).json({
            message: "Required fields are missing: userName, fullName and password."
        });
    }

    try {
        // Check if userName already exists.
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ message: "Username already in use." });
        }

        // Hash password.
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user.
        const newUser = new User({
            userName,
            fullName,
            password: hashedPassword,
        });

        // Save user.
        await newUser.save();

        // Respond with success.
        res.status(201).json({
            message: "User registered successfully.",
            user: { userName, fullName }
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({
            message: "Error registering user",
            error: error.message
        });
    }
};

export { signUp };


// Login
export const login = async (req, res) => {
    const { userName, password } = req.body;


    // Check if both userName and password are provided.
    if (!userName || !password) {
        return res.status(400).json({
            message: "Required fields are missing: userName and password."
        });
    }

    try {
        // Find user by userName.
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare entered password with stored hash.
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Respond with success.
        res.status(200).json({
            message: "Login successful",
            user: { userName: user.userName, fullName: user.fullName },
        });

    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};


// Logout
export const logout = (req, res) => {
    try {
      res.cookie("jwt","", {maxAge:0});
      res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
      console.log("Error in logout controller", error.message);
      res.status(500).json({error:"Internal server error"});
    }
  };
  

// GET
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};


// GET BY ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};