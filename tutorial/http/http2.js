const http2 = require('http2');
const fs = require('fs');

http2.createSecureServer({
    cert: fs.readFileSync('������ ������ ���');
    key: fs.readFileSync('������ ���Ű ���');
    ca: [
        fs.readFileSync('���� ������ ���'),
        fs.readFileSync('���� ������ ���'),
    ],
}, (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
})
    .listen(443, () => {
        console.log('443�� ��Ʈ���� ��� ���Դϴ�!')
    });