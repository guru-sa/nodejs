const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
})
    .listen(8080, () => {
        console.log('8080�� ��Ʈ���� ���� ��� ���Դϴ�!');
    });

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
})
    .listen(8081, () => {
        console.log('8081�� ��Ʈ���� ���� ��� ���Դϴ�!');
    });

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
});
server.listen(7000);
server.on('listening', () => {
    console.log('7000�� ��Ʈ���� ���� ��� ���Դϴ�!');
});
server.on('error', (error) => {
    console.error(error);
});

const fs = require('fs').promises;

http.createServer(async (req, res) => {
    try {
        const data = await fs.readFile('./front.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
    } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(err.message);
    }
})
    .listen(7001, () => {
        console.log('7001�� ��Ʈ���� ���� ��� ���Դϴ�!');
    });