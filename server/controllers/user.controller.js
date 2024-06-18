const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { email } = req.body.email;
        const existingUser = await User.findOne({ "email": email });
        if (existingUser) {
            return res.status(400).send({ error: 'Email already in use' });
        }

        const user = new User(req.body);
        console.log(user);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ "email": email });
        
        console.log(user);
        if (!user) {
            return res.status(400).send({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid email or password' });
        }

        res.status(200).send({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { registerUser, loginUser };
