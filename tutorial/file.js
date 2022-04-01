const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});

// 비동기 방식이지만 순서를 지킬 수 있음
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

fsp.writeFile('./writeme.txt', '글이 입력됩니다')
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
const buffer = Buffer.from('문자열을 버퍼로 변경');
console.log(buffer.toString());

const array = [Buffer.from('퐁당 '), Buffer.from('퐁당 '), Buffer.from('돌을 '), Buffer.from('던지자')];
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
writeStream.write('글 쓰기');
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
        return Promise.reject('이미 폴더가 있음');
    })
    .catch((err) => {
        if (err.code === 'ENOENT') {
            console.log('폴더 없음');
            return fsp.mkdir('./folder');
        }
        return Promise.reject(err);
    })
    .then(() => {
        console.log('폴더 만듬')
        return fsp.open('./folder/file.js', 'w');
    })
    .then((fd) => {
        console.log(fd);
        return fsp.rename('./folder/file.js', './folder/newfile.js');
    })
    .then(() => {
        console.log('이름 바꿈');
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
        console.log('파일 삭제');
        return fsp.rmdir('./folder');
    })
    .then(() => {
        console.log('폴더 삭제')
    })
    .catch((err) => {
        console.error(err);
    });

fsp.copyFile('readme.txt', 'writeme.txt')
    .then(() => {
        console.log('복사 완료')
    })
    .catch((error) => {
        console.error(error);
    });

fs.watch('./target.txt', (eventType, filename) => {
    console.log(eventType, filename);
});

