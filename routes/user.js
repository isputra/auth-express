const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// Register Page
router.get('/register', (req, res) => {
    res.render('register');
});

// Register Handle
router.post('/register', (req, res) => {
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

    // check if email exist

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
        } else {
            const saltRounds = 10;
            bcrypt.hash(password, saltRounds).then( hash => {
                const newUser = {
                    name,
                    email,
                    password: hash,
                };
                User.create(newUser).then(user => {
                    console.log(user);
                    res.send("User created..");
                }).catch(error => {
                    console.error(error);
                    res.send(error);
                })
            }).catch( error => {
                console.error(error);
                res.send(error);
            });
        }
    })
});



module.exports = router;