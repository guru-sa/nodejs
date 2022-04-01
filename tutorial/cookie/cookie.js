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
         * 쿠키명=쿠키값   : 기본적인 쿠키의 값
         * Expires=날짜    : 만료기한
         * Max-age=초      : 날짜 대신 초
         * Domain=도메인명 : 쿠키가 전송될 도메인을 특정
         * Path=URL        : 쿠키가 전송될 URL 특정
         * Secure          : HTTPS일 경우에만 쿠키 전송
         * HttpOnly        : 자바스크립트에서 쿠키에 접근할 수 없음
         * 
         * */
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    } else if (cookies.session && session[cookies.session].expires > new Date()) {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${cookies.name}님 안녕하세요`);
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
        console.log('8083번 포트에서 서버 대기 중입니다');
    });