const request = require('supertest');
const { sequelize } = require('../models');
const app = require('../app');

beforeAll(async () => {
    await sequelize.sync();
});

describe('POST /join', () => {
    test('�α��� �� ������ ����', (done) => {
        request(app)
            .post('/auth/join')
            .send({
                email: 'zerohch0@gmail.com',
                nick: 'zerocho',
                password: 'nodejsbook',
            })
            .expect('Location', '/')
            .expect(302, done);
    });
});

describe('POST /login', () => {
    const agent = request.agent(app);
    beforeEach((done) => {
        agent
            .post('/auth/login')
            .send({
                email: 'zerohch0@gmail.com',
                password: 'nodejsbook',
            })
            .end(done);
    });

    test('�̹� �α��������� redirect /', (done) => {
        const message = encodeURIComponent('�α����� �����Դϴ�.');
        agent
            .post('/auth/join')
            .send({
                email: 'zerohch0@gmail.com',
                nick: 'zerocho',
                password: 'nodejsbook',
            })
            .expect('Location', `/?error=${message}`)
            .expect(302, done);
    });
});

describe('POST /login', () => {
    test('���Ե��� ���� ȸ��', (done) => {
        const message = encodeURIComponent('���Ե��� ���� ȸ���Դϴ�.');
        request(app)
            .post('/auth/login')
            .send({
                email: 'zerohch1@gmail.com',
                password: 'nodejsbook',
            })
            .expect('Location', `/?loginError=${message}`)
            .expect(302, done);
    });

    test('�α��� ����', (done) => {
        request(app)
            .post('/auth/login')
            .send({
                email: 'zerohch0@gmail.com',
                password: 'nodejsbook',
            })
            .expect('Location', '/')
            .expect(302, done);
    });

    test('��й�ȣ Ʋ��', (done) => {
        const message = encodeURIComponent('��й�ȣ�� ��ġ���� �ʽ��ϴ�.');
        request(app)
            .post('/auth/login')
            .send({
                email: 'zerohch0@gmail.com',
                password: 'wrong',
            })
            .expect('Location', `/?loginError=${message}`)
            .expect(302, done);
    });
});

describe('GET /logout', () => {
    test('�α��� �Ǿ����� ������ 403', (done) => {
        request(app)
            .get('/auth/logout')
            .expect(403, done);
    });

    const agent = request.agent(app);
    beforeEach((done) => {
        agent
            .post('/auth/login')
            .send({
                email: 'zerohch0@gmail.com',
                password: 'nodejsbook',
            })
            .end(done);
    });

    test('�α׾ƿ� ����', (done) => {
        agent
            .get('/auth/logout')
            .expect('Location', `/`)
            .expect(302, done);
    });
});

afterAll(async () => {
    await sequelize.sync({ force: true });
});