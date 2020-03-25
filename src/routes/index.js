const express = require('express');
const router = express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('../config/auth');

router.get('/', checkNotAuthenticated, (req, res) => {
    res.render('welcome');
});

router.get('/dashboard', checkAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.user });
});
module.exports = router;