const User = require('../model/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ============================
// 📌 User Registration
// ============================
const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, description, profilePicture } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: 'First name, Last name, Email, and Password are required' });
        }

        // Check if user already exists (by email)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with that email' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and Save user
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            description: description || '',
            profilePicture: profilePicture || ''
        });
        await user.save();

        // Create JWT
        if (!process.env.JWT_SECRET) {
            console.warn('Warning: JWT_SECRET is not set in environment variables. Tokens may be invalid.');
        }

        const payload = { userId: user._id, firstName: user.firstName, lastName: user.lastName };
        if (user.userName) payload.userName = user.userName;

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        console.log(`✅ User registered successfully: ${user.email}`);

        // Return user info/token
        res.status(201).json({
            token,
            user: {
                userId: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                description: user.description,
                profilePicture: user.profilePicture
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
};

// ============================
// 🔐 User Login
// ============================
const loginUser = async (req, res) => {
    try {
        const { identifier, password } = req.body; // identifier = email only now

        if (!identifier || !password) {
            return res.status(400).json({ error: 'Email and Password are required' });
        }

        // Find user by email
        const user = await User.findOne({ email: identifier });

        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed, passwords don\'t match' });
        }

        // Generate token
        if (!process.env.JWT_SECRET) {
            console.warn('Warning: JWT_SECRET is not set in environment variables. Tokens may be invalid.');
        }

        const loginPayload = { userId: user._id, firstName: user.firstName, lastName: user.lastName };
        if (user.userName) loginPayload.userName = user.userName;

        const token = jwt.sign(loginPayload, process.env.JWT_SECRET);

        // Return user data
        res.status(200).json({
            token,
            user: {
                userId: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                description: user.description,
                profilePicture: user.profilePicture
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

module.exports = {
    registerUser,
    loginUser
};
