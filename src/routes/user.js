const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const { checkAuthenticated, checkNotAuthenticated } = require('../config/auth');

const router = express.Router();

// Login Page
router.get('/login', checkNotAuthenticated,(req, res) => {
    res.render('login');
});

// Register Page
router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register');
});

// Register Handle
router.post('/register', checkNotAuthenticated, (req, res) => {
    const { name, email, password, password_confirm } = req.body;
    let errors = [];

    // Check required fields
    if(!name) errors.push({msg: "Please fill in name field."});
    if(!email) errors.push({msg: "Please fill in email field."});
    if(!password) errors.push({msg: "Please fill in password field."});
    if(!password_confirm) errors.push({msg: "Please fill in password confirmation field."});

    // check password
    if(password !== password_confirm) errors.push({msg: "Passwords don't match."});

    // check password
    if(password.length < 6) errors.push({msg: "Password should be at least 6 characters."});

    // check if there is error
    if(errors.length > 0) {
        return res.render('register', {
            errors,
            name,
            email,
            password,
            password_confirm
        });
    }

    // check if email exist
    User.findOne({email})
    .then( user => {
        if(user) {
            errors.push({msg: "Email already exist."})
            return res.render('register', {
                errors,
                name,
                email,
                password,
                password_confirm
            });    
        }
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds).then( hash => {
            const newUser = {
                name,
                email,
                password: hash,
            };
            User.create(newUser).then(user => {
                req.flash('success_msg', "You are now registered and can log in")
                res.redirect("/users/login");
            }).catch(error => {
                console.error(error);
                res.send(error);
            })
        }).catch( error => {
            console.error(error);
            res.send(error);
        });
    })
});

// Login handle
router.post('/login', checkNotAuthenticated, (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout handle
router.get('/logout', checkAuthenticated, (req, res,next) => {
    req.logout();
    req.flash('success_msg', "You are logged out");
    res.redirect('/users/login');
})

module.exports = router;