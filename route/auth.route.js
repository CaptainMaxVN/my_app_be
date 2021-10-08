const express = require('express');
const router = express.Router();
const User = require('../schema/user');
const jwtService = require('../service/jwt.service');
const bcrypt = require('bcrypt');
const log = require('../service/log.service');

router.post('/register', (req, res) => {
    let { username, password } = req.body;
    const user = new User({
        name: username,
        password: encryptPassword(password)
    });
    
    user.save().then(result => {
        log.info(result);
        res.json({
            result: 'register succeeded!'
        });
    })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                result: 'Register failed! User name has been existing already.'
            });
        })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ name: username}).then(result => {
        log.info('found user: ' + result);
        let message;
        if (result && bcrypt.compareSync(password, result.password)) {
            const accessToken = jwtService.sign({username: username});
            res.json({
                result: 'success',
                token: accessToken
            });
            message = 'logged in successfully with jwt token: ' + accessToken;
        }
        else {
            message = 'incorrect credential information';
            res.status(401).json({
                result: message
            });
        }
        log.info(message);
    })
        .catch(err => {
            console.log(err);
            res.json({
                result: 'fail',
            });
        });
})

// router.get('/users', (req, res) => {
//     User.find({}).exec((err, user) => {
//         if (err) {
//             console.log(err);
//             res.json({
//                 result: 'fail:',
//                 error: error
//             });
//         }
//         else {
//             res.json({
//                 result: "success",
//                 users: user
//             })
//         }
//     });
// });

// router.get('/user/:username', (req, res) => {
//     User.find({ 'name': req.params.username }).exec((err, user) => {
//         if (err) {
//             console.log(err);
//             res.json({
//                 result: 'fail',
//                 error: error
//             });
//         }
//         else {
//             res.json({
//                 result: "success",
//                 users: user
//             })
//         }
//     });
// });

const encryptPassword = password => {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
}

module.exports = router;