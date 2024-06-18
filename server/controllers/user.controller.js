const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { email } = req.body.email;
        const existingUser = await User.findOne({ "email": email });
        if (existingUser) {
            return res.status(400).send({ error: 'Email already in use' });
        }

        const user = new User(req.body);
        await user.save();
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).send({ message: 'User registered successfully', token: token, userInfo:user });
    } catch (error) {
        res.status(400).send(error);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ "email": email });

        if (!user) {
            return res.status(400).send({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).send({ message: 'Login successful', "UserInfo":user, token : token });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { registerUser, loginUser };
