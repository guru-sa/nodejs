const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

describe('isLoggedIn', () => {
    const res = {
        status: jest.fn(() => res),
        send: jest.fn(),
    };
    const next = jest.fn();

    test('�α��εǾ� ������ isLoggedIn�� next�� ȣ���ؾ� ��', () => {
        const req = {
            isAuthenticated: jest.fn(() => true),
        };
        isLoggedIn(req, res, next);
        expect(next).toBeCalledTimes(1);
    });

    test('�α��εǾ� ���� ������ isLoggedIn�� ������ ȣ���ؾ� ��', () => {
        const req = {
            isAuthenticated: jest.fn(() => false),
        };
        isLoggedIn(req, res, next);
        expect(res.status).toBeCalledWith(403);
        expect(res.send).toBeCalledWith('�α��� �ʿ�');
    });
});

describe('isNotLoggedIn', () => {
    const res = {
        redirect: jest.fn(),
    };
    const next = jest.fn();

    test('�α��εǾ� ������ isNotLoggedIn�� ������ �����ؾ� ��', () => {
        const req = {
            isAuthenticated: jest.fn(() => true),
        };
        isNotLoggedIn(req, res, next);
        const message = encodeURIComponent('�α����� �����Դϴ�.');
        expect(res.redirect).toBeCalledWith(`/?error=${message}`);
    });

    test('�α��εǾ� ���� ������ isNotLoggedIn�� next�� �����ؾ� ��', () => {
        const req = {
            isAuthenticated: jest.fn(() => false),
        };
        isNotLoggedIn(req, res, next);
        expect(next).toBeCalledTimes(1);
    });
});