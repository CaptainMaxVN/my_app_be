const express = require('express');
const router = express.Router();
const jwtService = require('../service/jwt.service');

router.get('/userInfo', jwtService.authenticate, (req, res) => {
    res.json(res.userInfo)
});

module.exports = router;