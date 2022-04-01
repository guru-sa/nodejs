const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

dotenv.config();
const indexRouter = require('./routes');
const userRouter = require('./routes/user');
const app = express();

app.set('port', process.env.PORT || 3000); // app.set�� ���������� ����
/* [pug] npm i pug */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* [nunjucks] npm i nunjucks */
const nunjucks = require('nunjucks');
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});
// app.use(morgan('dev')); // dev, combined, common, short, tiny
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        morgan('combined')(req, res, next);
    } else {
        morgan('dev')(req, res, next);
    }
});

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/*
 * const bodyParser = require('body-parser');
 * app.use(bodyParser.raw());
 * app.use(bodyParser.text());
 * */
app.use(cookieParser(process.env.COOKIE_SECRET));
/*
 * res.cookie('key', 'value', {
 *  expires: new Date(Date.now() + 900000),
 *  httpOnly: true,
 *  secure: true,
 * });
 * res.clearCookie('key', 'value', { httpOnly: true, secure: true });
 * */
app.use(session({
    resave: false,
    saveUninitialized: false;
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));
/*
 * req.session.name = 'name'; // ���� ���
 * req.sessionID; // ���� ���̵� Ȯ��
 * req.session.destroy(); // ���� ��� ����
 * */

app.use('/', indexRouter); // index�� ���� ����
app.use('/user', userRouter);

/* middleware */
app.use((req, res, next) => {
    console.log('��� ��û�� �� �����');
    req.data = '������';
    next();
}, (req, res, next) => {
    console.log(req.data);
    next();
});

app.get('/', (req, res, next) => {
    // res.send('Hello Express');
    res.sendFile(path.join(__dirname, '/index.html'));
    next();
}, (req, res) => {
    throw new Error('������ ���� ó�� �̵����� ���ϴ�');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '�� ��Ʈ���� ��� ���Դϴ�')
});

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads ������ ���� uploads ������ �����մϴ�');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
});

/* none file */
app.post('/upload', upload.none(), (req, res) => {
    console.log(req.file, req.body);
    res.send('ok');
});

/* single file */
app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.body);
    res.send('ok');
});
/* multiple file */
app.post('/upload', upload.array('many'), (req, res) => {
    console.log(req.files, req.body);
    res.send('ok');
});
/* multiple file with keys */
app.post('/upload',
    upload.fields([{ name: 'image1' }, { name: 'image2' }]),
    (req, res) => {
        console.log(req.files, req.body);
        res.send('ok');
    }
);

router.get('/user/:id', (req, res) => { // /user/123?limit=5&skip=10
    console.log(req.params, req.query); // { id: 123 } {limit: '5', skip: '10'}
});

router.route('/abc')
    .get((req, res) => {
        res.send('GET /abc');
    })
    .post((req, res) => {
        res.send('POST /abc');
    });

