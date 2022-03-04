'use strict'

const fs = require('fs');
const path = require('path');
const log = require('log4js')
const cluster = require('cluster');
const https = require('https')

var logger = log.getLogger('manager')
var env = require('./env.json');
logger.level = env.server.log.level

var option
option = {
    key: fs.readFileSync(path.join(env.server.cert.path, 'server.key')),
    cert: fs.readFileSync(path.join(env.server.cert.path, 'server.crt')),
}
if (env.client.auth) {
    logger.info("use client auth")
    option = {
        key: fs.readFileSync(path.join(env.server.cert.path, 'server.key')),
        cert: fs.readFileSync(path.join(env.server.cert.path, 'server.crt')),
        ca: [
            fs.readFileSync(path.join(env.server.cert.path, 'ca.crt')),
        ],
        requestCert: true,
        rejectUnauthorized: false
    }
}

var app = require('./app.js')

if (cluster.isMaster) {
    for (var i = 0; i < require('os').cpus().length; i++) {
        var worker = cluster.fork()
    }
    cluster.on('exit', function(worker, code, signal) {
        logger.info('worker[' + worker.process.pid + '] is exited')
    })
} else {
    logger.info('worker[' + process.pid + '] is activated')
    var server = https.createServer(option, app.app).listen(7001, "0.0.0.0", function() {})
    server.timeout = 240000
}