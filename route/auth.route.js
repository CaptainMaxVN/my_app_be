const express = require('express');
const router = express.Router();
const User = require('../schema/user');
const jwtService = require('../service/jwt.service');

router.post('/register', (req, res) => {
    let { username, password } = req.body;
    const user = new User({
        name: username,
        password: password
    });
    user.save().then(result => {
        console.log(result);
        res.json({
            result: 'register successfully'
        });
    })
        .catch(err => {
            console.log(err);
            res.json({
                result: 'register failed'
            });
        })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    User.findOne({ name: username, password: password }).then(result => {
        if (result) {
            console.log('found: ' + result);
            const accessToken = jwtService.sign({username: username});
            res.json({
                result: 'success',
                token: accessToken
            });
        }
        else {
            res.status(400).json({
                result: 'incorrect credential information'
            });
        }
    })
        .catch(err => {
            console.log(err);
            res.json({
                result: 'fail',
            });
        });
})

router.get('/users', (req, res) => {
    User.find({}).exec((err, user) => {
        if (err) {
            console.log(err);
            res.json({
                result: 'fail:',
                error: error
            });
        }
        else {
            res.json({
                result: "success",
                users: user
            })
        }
    });
});

router.get('/user/:username', (req, res) => {
    User.find({ 'name': req.params.username }).exec((err, user) => {
        if (err) {
            console.log(err);
            res.json({
                result: 'fail',
                error: error
            });
        }
        else {
            res.json({
                result: "success",
                users: user
            })
        }
    });
});

module.exports = router;