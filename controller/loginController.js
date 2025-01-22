import User from "../models/userModel.js";

export const loginController = async (req, res) => {
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    res.render('login');
}

export const getDoc = async (req, res) => {
    try {
        const { number, password } = req.body;
        
        const user = await User.findOne({ number });
        
        if (!user) {
            return res.status(401).json({ error: "Invalid number or password" });
        }

        if (password === user.password) {
            // Set user session
            req.session.user = {
                id: user._id,
                name: user.name,
                number: user.number
            };
            
            // Save session before redirecting
            req.session.save((err) => {
                if (err) {
                    console.error("Session save error:", err);
                    return res.status(500).json({ error: "Login failed" });
                }
                res.redirect('/dashboard');
            });
        } else {
            return res.status(401).json({ error: "Invalid number or password" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ error: "Logout failed" });
        }
        res.redirect('/login');
    });
}