const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

// Register endpoint
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if name entered
        if (!name) {
            return res.json({ 
                error: 'Name is required' });
        }

        // Check if password is good
        if (!password || password.length < 6) {
            return res.json({ 
                error: 'Password is required and should be at least 6 character long' });
        }

        // Check if email entered
        const exist = await User.findOne({ email });

        if(exist) {
            return res.json({ 
                error: 'Email is already taken' });
        }

        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })
        return res.json(user);
    } catch (error) {
        console.log(error);
    }
}

// Login endpoint
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ 
                error: 'Email or password are wrong' });
        }

        // Check password match
        const match = await comparePassword(password, user.password);
        if (match) {
           jwt.sign({ email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json(user)
           })
        }
        if(!match) {
            res.json({
                error: 'Something went wrong'
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const getProfile = (req, res) => {
    const {token} = req.cookies;
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: 'Logged out'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
}