const express = require('express');
const path = require('path');
// require('dotenv').config({path: '.env'});

/**
 * Create Express server.
 */
const app = express();


/**
 * Express configuration.
 */
app.listen(process.env.PORT || 3000);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', express.static(path.join(__dirname, '../..', 'static')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'static/index.html'))
})

// RUN SERVER
console.log('SERVER IS RUNNING ');