const jwt = require('jsonwebtoken');
const config = require('../config/global.config');

module.exports.sign = (subject) => {
    const accessToken = jwt.sign(subject, config.jwt.secret, config.jwt.signOptions);
    
    return accessToken;
}
module.exports.authenticate = (req, res, next) => {

    const authorization = req.get('Authorization');
    if(authorization) {
        try {
            var token = authorization.split(' ')[1];
            const result = jwt.verify(token, config.jwt.secret);
            res.userInfo = result;
            next();
        }
        catch(err) {
            res.status(401).send('you need to login again');
        }
    }
    else {
        res.status(401).send('request header doesnot have Authorization');
    }
}
