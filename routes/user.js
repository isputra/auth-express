const express = require('express');
const router = express.Router();

// Login Page
router.get('/login', (req, res) => {
    res.send('Login').end();
});

// Register Page
router.get('/register', (req, res) => {
    res.send('Register').end();
});


module.exports = router;