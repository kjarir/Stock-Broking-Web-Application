import User from "../models/userModel.js";

export const signupController = (req, res) => {
    res.render('signup');
}

export const createDoc = async (req, res) => {
    try {
        const { name, number, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ number });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Create new user
        const user = new User({
            name,
            number,
            password
        });

        await user.save();

        // Set user session
        req.session.user = {
            id: user._id,
            name: user.name,
            number: user.number
        };

        res.redirect('/dashboard');
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}