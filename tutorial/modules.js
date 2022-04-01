/* 
 * process 
 * */
console.log(process.version); // 설치된 노드의 버전
console.log(process.arch); // 프로세서 아키텍처 정보
console.log(process.platform); // 운영체제 플랫폼 정보
console.log(process.pid); // 현재 프로세스의 ID
console.log(uptime()); // 프로세스가 시작된 후 흐른 시간
console.log(process.execPath); // 노드의 경로
console.log(process.cwd()); // 현재 프로세스가 실행되는 위치
console.log(process.cpuUsage()); // 현재 cpu 사용량
console.log(process.env);
process.nextTick(() => {
    /*
     * resolve된 Promise와 함께 마이크로태스크(microtask)로 분류된다.
     * setImmediate나 setTimeout보다 먼저 실행된다.
     * */
    console.log('nextTick');
});
process.exit(0);
/*
 * os
 * */
const os = require('os');
console.log(os.arch()); // 프로세서 아키텍처 정보
console.log(os.platform()); // 운영체제 플랫폼 정보
console.log(os.type()); // 운영체제의 종류
console.log(os.uptime()); // 운영체제 부팅 이후 흐른 시간
console.log(os.hostname()); // 컴퓨터의 이름
console.log(os.release()); // 운영체제의 버전
console.log(os.homedir()); // 홈 디렉토리 경로
console.log(os.tmpdir()); // 임시 파일 저장 경로
console.log(os.cpus()); // 컴퓨터의 코어 정보
console.log(os.cpus().length); // 컴퓨터의 코어 개수
console.log(os.freemem()); // 사용 가능한 메모리
console.log(os.totalmem()); // 전체 메모리 용량

/*
 * path
 * */
const path = require('path');

const string = __filename;

console.log(path.sep); // 경로의 구분자
console.log(path.delimeter); // 환경 변수의 구분자
console.log(path.dirname(string)); // 파일이 위치한 폴더 경로
console.log(path.extname(string)); // 파일의 확장자
console.log(path.basename(string)); // 파일의 이름(확장자 포함)
console.log(path.basename(string, path.extname(string))); // 파일의 이름
console.log(path.parse(string)); //파일 경로를 root, dir, base, ext, name으로 분리
console.log(path.format({ // path.parse() 한 객체를 파일 경로로 합침
    dir: 'C:\\users\zerocho',
    name: 'path',
    ext: '.js',
})); 
console.log(path.normalize('C:\\users\\zerocho\\path.js')); // 정상적인 경로로 변환
console.log(path.isAbsolute('C:\\')); // 파일의 경로가 절대 경로인지 상대경로인지
console.log(path.relative('C:\\users\\zerocho\\path.js', 'C:\\')); // 첫 번째 경로에서 두 번째 경로로 가는 방법을 알림
console.log(path.join(__dirname, '..', '..', '/users', '.', '/zerocho')); // 여러 인수를 하나의 경로로 합침
console.log(path.resolve(__dirname, '..', 'users', '.', '/zerocho')); //

/*
 * url
 * */
const url = require('url');
const { URL } = url;
const myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
console.log(myURL);
console.log(url.format(myURL));
const parsedUrl = url.parse('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
console.log(parsedUrl);
console.log(url.format(parsedUrl));

const searchURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
console.log(searchURL.searchParams);
console.log(searchURL.searchParams.getAll('category'));
console.log(searchURL.searchParams.get('limit'));
console.log(searchURL.searchParams.has('page'));
console.log(searchURL.searchParams.keys());
console.log(searchURL.searchParams.values());

searchURL.searchParams.append('filter', 'es3');
searchURL.searchParams.append('filter', 'es5');
console.log(searchURL.searchParams.getAll('filter'));
searchURL.searchParams.set('filter', 'es6');
console.log(searchURL.searchParams.getAll('filter'));
searchURL.searchParams.delete('filter');
searchURL.search = searchURL.searchParams.toString();

/*
 * querystring
 * */
const querystring = require('querystring');
const query = querystring.parse(parsedUrl.query);
console.log(query);
console.log(querystring.stringify(query));

/*
 * crypto
 * */
const crypto = require('crypto');
console.log(crypto.createHash('sha512').update('password').digest('base64'));
console.log(crypto.createHash('sha512').update('password').digest('hex'));
/* pbkdf2 */
crypto.randomBytes(64, (err, buf) => {
    const salt = buf.toString('base64');
    console.log(salt);
    crypto.pbkdf2('password', salt, 100000, 64, 'sha512', (err, key) => {
        console.log(key.toString('base64');
    })
});

const algorithm = 'aes-256-cbc';
const key = 'abcdefghijklmnopqrstuvwxyz123456';
const iv = '1234567890123456';
const cipher = crypto.createCipher(algorithm, key, iv);
let result = cipher.update('text', 'utf8', 'base64');
result += cipher.final('base64');
console.log(result);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let result2 = decipher.update(result, 'base64', 'utf8');
result2 += decipher.final('utf8');
console.log(result2);

/*
 * util
 * */
const util = require('util');
const dontUseMe = util.deprecate((x, y) => {
    console.log(x + y);
}, 'dontUseMe function is deprecated');
dontUseMe(1, 2);

const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)
    .then((buf) => {
        console.log(buf.toString('base64'));
    })
    .catch((error) => {
        console.log(error);
    });

/*
 * worker_threads
 * */
const {
    Worker, isMainThread, parentPort,
} = require('worker_threads');

if (isMainThread) {
    const worker = new Worker(__filename);
    worker.on('message', message => console.log('from worker', message));
    worker.on('exit', () => console.log('worker exit'));
    worker.postMessage('ping');
} else {
    parentPort.on('message', (value) => {
        console.log('from parent', value);
        parentPort.postMessage('pong');
        parentPort.close();
    })
}

const {
    Worker, isMainThread, parentPort, workerData,
} = require('worker_threads');

if (isMainThread) {
    const threads = new Set();
    threads.add(new Worker(__filename, {
        workerData: { start: 1 },
    }));
    threads.add(new Worker(__filename, {
        workerData: { start: 2 },
    }));
    for (let worker of threads) {
        worker.on('message', message => console.log('from worker', message));
        worker.on('exit', () => {
            threads.delete(worker);
            if (threads.size == 0) {
                console.log('job done');
            }
        });
    }
} else {
    const data = workerData;
    parentPort.postMessage(data.start + 100);
 }

/*
 * child_process
 * */
const exec = require('child_process').exec;
const process = exec('dir');
process.stdout.on('data', function (data) {
    console.log(data.toString());
});
process.stderr.on('data', function (data) {
    console.error(data.toString());
});

const spawn = require('child_process').spawn;
const py = spawn('python', ['test.py']);
py.stdout.on('data', function (data) {
    console.log(data.toString());
});
py.stderr.on('data', function (data) {
    console.error(data.toString());
});