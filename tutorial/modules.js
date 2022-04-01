/* 
 * process 
 * */
console.log(process.version); // ��ġ�� ����� ����
console.log(process.arch); // ���μ��� ��Ű��ó ����
console.log(process.platform); // �ü�� �÷��� ����
console.log(process.pid); // ���� ���μ����� ID
console.log(uptime()); // ���μ����� ���۵� �� �帥 �ð�
console.log(process.execPath); // ����� ���
console.log(process.cwd()); // ���� ���μ����� ����Ǵ� ��ġ
console.log(process.cpuUsage()); // ���� cpu ��뷮
console.log(process.env);
process.nextTick(() => {
    /*
     * resolve�� Promise�� �Բ� ����ũ���½�ũ(microtask)�� �з��ȴ�.
     * setImmediate�� setTimeout���� ���� ����ȴ�.
     * */
    console.log('nextTick');
});
process.exit(0);
/*
 * os
 * */
const os = require('os');
console.log(os.arch()); // ���μ��� ��Ű��ó ����
console.log(os.platform()); // �ü�� �÷��� ����
console.log(os.type()); // �ü���� ����
console.log(os.uptime()); // �ü�� ���� ���� �帥 �ð�
console.log(os.hostname()); // ��ǻ���� �̸�
console.log(os.release()); // �ü���� ����
console.log(os.homedir()); // Ȩ ���丮 ���
console.log(os.tmpdir()); // �ӽ� ���� ���� ���
console.log(os.cpus()); // ��ǻ���� �ھ� ����
console.log(os.cpus().length); // ��ǻ���� �ھ� ����
console.log(os.freemem()); // ��� ������ �޸�
console.log(os.totalmem()); // ��ü �޸� �뷮

/*
 * path
 * */
const path = require('path');

const string = __filename;

console.log(path.sep); // ����� ������
console.log(path.delimeter); // ȯ�� ������ ������
console.log(path.dirname(string)); // ������ ��ġ�� ���� ���
console.log(path.extname(string)); // ������ Ȯ����
console.log(path.basename(string)); // ������ �̸�(Ȯ���� ����)
console.log(path.basename(string, path.extname(string))); // ������ �̸�
console.log(path.parse(string)); //���� ��θ� root, dir, base, ext, name���� �и�
console.log(path.format({ // path.parse() �� ��ü�� ���� ��η� ��ħ
    dir: 'C:\\users\zerocho',
    name: 'path',
    ext: '.js',
})); 
console.log(path.normalize('C:\\users\\zerocho\\path.js')); // �������� ��η� ��ȯ
console.log(path.isAbsolute('C:\\')); // ������ ��ΰ� ���� ������� ���������
console.log(path.relative('C:\\users\\zerocho\\path.js', 'C:\\')); // ù ��° ��ο��� �� ��° ��η� ���� ����� �˸�
console.log(path.join(__dirname, '..', '..', '/users', '.', '/zerocho')); // ���� �μ��� �ϳ��� ��η� ��ħ
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