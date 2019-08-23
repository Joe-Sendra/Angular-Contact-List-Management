const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/users');

function verfyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, config.secret);
    if (!payload) {
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();
}

// Register
router.post('/register', (req, res, next) => {
    User.getUserByUsername(req.body.username, (err, user) => {
        if (err) console.log(err);
        if(!user){        
            let newUser = new User({
                username: req.body.username,
                password: req.body.password,
                role: 'user'
            });

            User.addUser(newUser, (err, user) => {
                if(err){
                    res.json({success: false, msg: 'Failed to register user'});
                } else {
                    let payload = {
                        subject: newUser._id,
                        role: 'user'
                    }
                    let token = jwt.sign(payload, config.secret)
                    res.status(200).send({token})
                }
            });
        } else {
            // Username already exists
            res.status(409).json({
                message: 'Conflict: Username already exists',
                isUsernameAvailable: false
            })
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.status(401).send('Unauthorized request')
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                let payload = {
                    subject: user._id,
                    role: user.role
                }
                let token = jwt.sign(payload, config.secret)
                res.status(200).json({
                    message: 'Successful log in',
                    role: user.role,
                    token: token
                })
            } else {
                return res.status(401).send('Unauthorized request')
            }
        });
    });
});

module.exports = router;