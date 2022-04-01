const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`${process.pid}`);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid}`);
        console.log('code', code, 'signal', signal);
    });
} else {
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>hello Node!</h1>');
        res.end('<p>Hello Cluster!</p>');
    }).listen(8086);
    console.log(`${process.pid}`);
}
