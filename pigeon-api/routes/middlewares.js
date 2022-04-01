const jwt = require('jsonwebtoken');
const RateLimit = require('express-rate-limit');

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('�α��� �ʿ�');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};

exports.verifyToken = (req, res, next) => {
    try {
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') { // ��ȿ�Ⱓ �ʰ�
            return res.status(419).json({
                code: 419,
                message: '��ū�� ����Ǿ����ϴ�',
            });
        }
        return res.status(401).json({
            code: 401,
            message: '��ȿ���� ���� ��ū�Դϴ�',
        });
    }
};

exports.apiLimiter = new RateLimit({
    windowMs: 60 * 1000, // ���ؽð�: 1��
    max: 10, // ��� Ƚ��
    delayMs: 0, 
    handler(req, res) { // ���� �ʰ� �� �ݹ� �Լ�
        res.status(this.statusCode).json({
            code: this.statusCode, // �⺻�� 429
            message: '1�п� �� ���� ��û�� �� �ֽ��ϴ�.',
        });
    },
});

exports.deprecated = (req, res) => {
    res.status(410).json({
        code: 410,
        message: '���ο� ������ ���Խ��ϴ�. ���ο� ������ ����ϼ���.',
    });
};