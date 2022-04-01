const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});

// �񵿱� ��������� ������ ��ų �� ����
fs.readFile('./readme1.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data.toString());
    fs.readFile('./readme2.txt', (err, data) => {
        if (err) {
            throw err;
        }
        console.log(data.toString());
        fs.readFile('./readme3.txt', (err, data) => {
            if (err) {
                throw err;
            }
            console.log(data.toString());
        });
    });
});

let data = fs.readFileSync('./readme2.txt');
console.log(data.toString());

const fsp = require('fs').promises;

fsp.readFile('./readme1.txt')
    .then((data) => {
        console.log(data.toString());
        return fsp.readFile('./readme2.txt');
    })
    .then((data) => {
        console.log(data.toString());
        return fsp.readFile('./readme3.txt');
    })
    .then((data) => {
        console.log(data.toString());
    })
    .catch((err => {
        console.error(err)
    }));

fsp.writeFile('./writeme.txt', '���� �Էµ˴ϴ�')
    .then(() => {
        return fs.readFile('./writeme.txt');
    })
    .then((data) => {
        console.log(data.toString());
    })
    .catch((err) => {
        console.error(err);
    });

/*
 * buffer
 * */
const buffer = Buffer.from('���ڿ��� ���۷� ����');
console.log(buffer.toString());

const array = [Buffer.from('���� '), Buffer.from('���� '), Buffer.from('���� '), Buffer.from('������')];
const buffer2 = Buffer.concat(array);
console.log(buffer2.toString());

const buffer3 = Buffer.alloc(5); // 5bytes

/*
 * stream
 * */
const readStream = fs.createReadStream('./readme.txt', { highWaterMark: 16 });
const data = [];

readStream.on('data', (chunk) => {
    data.push(chunk);
    console.log(chunk, chunk.length);
});

readStream.on('end', () => {
    console.log(Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
    console.error(err);
});

const writeStream = fs.createWriteStream('./writeme.txt');
writeStream.on('finish', () => {
    console.log('finish');
});
writeStream.write('�� ����');
writeStream.end();

/*
 * gzip
 * */
const zlib = require('zlib');
const zlibStream = zlib.createGzip();
readStream.pipe(zlibStream).pipe(writeStream);

const constants = require('fs').constants;

fsp.access('./folder', constants.F_OK | constants.W_OK | constants.R_OK)
    .then(() => {
        return Promise.reject('�̹� ������ ����');
    })
    .catch((err) => {
        if (err.code === 'ENOENT') {
            console.log('���� ����');
            return fsp.mkdir('./folder');
        }
        return Promise.reject(err);
    })
    .then(() => {
        console.log('���� ����')
        return fsp.open('./folder/file.js', 'w');
    })
    .then((fd) => {
        console.log(fd);
        return fsp.rename('./folder/file.js', './folder/newfile.js');
    })
    .then(() => {
        console.log('�̸� �ٲ�');
    })
    .catch((err) => {
        console.error(err);
    });

fsp.readdir('./folder')
    .then((dir) => {
        console.log(dir);
        return fsp.unlink('./folder/newFile.js'); // delete file
    })
    .then(() => {
        console.log('���� ����');
        return fsp.rmdir('./folder');
    })
    .then(() => {
        console.log('���� ����')
    })
    .catch((err) => {
        console.error(err);
    });

fsp.copyFile('readme.txt', 'writeme.txt')
    .then(() => {
        console.log('���� �Ϸ�')
    })
    .catch((error) => {
        console.error(error);
    });

fs.watch('./target.txt', (eventType, filename) => {
    console.log(eventType, filename);
});

