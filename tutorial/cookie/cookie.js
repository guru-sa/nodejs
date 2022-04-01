const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

const session = {};

http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);

    if (req.url.startsWith('/login')) {
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);
        const uniqueInt = Date.now();
        session[uniqueInt] = {
            name,
            expires,
        };
        /*
         * ��Ű��=��Ű��   : �⺻���� ��Ű�� ��
         * Expires=��¥    : �������
         * Max-age=��      : ��¥ ��� ��
         * Domain=�����θ� : ��Ű�� ���۵� �������� Ư��
         * Path=URL        : ��Ű�� ���۵� URL Ư��
         * Secure          : HTTPS�� ��쿡�� ��Ű ����
         * HttpOnly        : �ڹٽ�ũ��Ʈ���� ��Ű�� ������ �� ����
         * 
         * */
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    } else if (cookies.session && session[cookies.session].expires > new Date()) {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${cookies.name}�� �ȳ��ϼ���`);
    } else {
        try {
            const data = await fs.readFile('./cookie.html');
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(err.message);
        }
    }
    // console.log(req.url, req.headers.cookie);
    // res.writeHead(200, { 'Set-Cookie': 'mycookie=test' });
    // res.end('Hello Cookie');
})
    .listen(8083, () => {
        console.log('8083�� ��Ʈ���� ���� ��� ���Դϴ�');
    });