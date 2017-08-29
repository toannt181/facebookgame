'use strict';

var express = require('express');
require('dotenv').config();
var app = express();

app.get('/', function (req, res) {
    res.send('helo');
});

app.listen(process.env.PORT || 3000);

console.log('SERVER RUN COMPLETELY at PORT' + process.env.PORT);