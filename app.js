const bodyParser = require('body-parser');
const express = require('express');
const  mongoose = require('mongoose');
const auth = require('./route/auth.route');
const home = require('./route/home.route');
const config = require('./config/global.config');

var app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb.url, config.mongodb.dbOptions).then(
    () => {
        console.log('Connecting DB successfully!');
    },
    (err) => {
        console.log('Connecting DB failed. Error: ' + err);
    }
);

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json({limit: '50mb'}));

const log = (req, res, next) => {
    console.log('path: ' + req.originalUrl);
    console.log(req.body);
    next();
}

app.use(log);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.listen(3000, () => {
    console.log('listening on port 3000');
})

app.use("/auth", auth);
app.use("/", home);

