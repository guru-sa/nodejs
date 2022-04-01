jest.mock('../models/user'); // ���� �����ͺ��̽��� ����Ǿ� �����Ƿ� �׽�Ʈ ȯ�濡���� User �𵨵� ��ŷ�ؾ� ��
const User = require('../models/user');
const { addFollowing } = require('../controllers/user');

describe('addFollowing', () => {
    const req = {
        user: { id: 1 },
        params: { id: 2 },
    };
    const res = {
        send: jest.fn(),
    };
    const next = jest.fn();

    test('����ڸ� ã�� �ȷ����� �߰��ϰ� success�� �����ؾ� ��', async () => {
        User.findOne.mockReturnValue(Promise.resolve({
            addFollowing(id) {
                return Promise.resolve(true);
            }
        }));
        await addFollowing(req, res, next);
        expect(res.send).toBeCalledWith('success');
    });

    test('����ڸ� �� ã���� next(error)�� ȣ����', async () => {
        const error = '����� �� ã��';
        User.findOne.mockReturnValue(Promise.reject(error));
        await addFollowing(req, res, next);
        expect(next).toBeCalledWith(error);
    });
});