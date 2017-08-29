const express = require('express');
const path = require('path');

/**
 * Create Express server.
 */
const app = express();


/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', express.static(path.join(__dirname, '../..', 'static')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/index.html'))
})

// RUN SERVER
const server = app.listen(app.get('port'), () => {
    console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});