const bodyParser = require('body-parser');
const express = require('express');
const  mongoose = require('mongoose');
const auth = require('./route/auth.route');
const home = require('./route/home.route');
const todo = require('./route/todo.route');
const config = require('./config/global.config');
const logger = require('./service/log.service');
var cors = require('cors')

var app = express();
app.use(cors())

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb.url, config.mongodb.dbOptions).then(
    () => {
        logger.info('Connecting DB successfully!');
    },
    (err) => {
        logger.error('Connecting DB failed. Error: ' + err);
    }
);

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json({limit: '50mb'}));

const log = (req, res, next) => {
    logger.info('path: ' + req.originalUrl);
    logger.info('req body: ' + JSON.stringify(req.body));
    next();
}

app.use(log);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.listen(config.port, () => {
    logger.info('listening on port ' + config.port);
})

app.use("/auth", auth);
app.use("/todo", todo);
app.use("/", home);


