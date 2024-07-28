const express = require('express');
const router = express.Router();
const Login = require('../Models/login'); // Adjust the path if necessary

// CRUD for Login

// Create a new login (signup)
router.post('/signup', async (req, res) => {
    const login = new Login({
        username: req.body.username,
        password: req.body.password,
    });

    try {
        const newLogin = await login.save();
        res.status(201).json(newLogin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login route
router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await Login.findOne({ username });

        if (user && user.password === password) {
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Other CRUD operations...

module.exports = router;
