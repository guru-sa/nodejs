const { Op } = require('sequelize');
const { User } = require('../models');

// INSERT INTO nodejs.users (name, age, married, comment) VALUES ('zero', 24, 0, '�ڱ�Ұ�');
User.create({
    name: 'zero',
    age: 24,
    married: false,
    comment: '�ڱ�Ұ�',
});

// SELECT * FROM nodejs.users;
User.findAll({});

// SELECT * FROM nodejs.users LIMIT 1;
User.findOne({});

// SELECT name, married FROM nodejs.users;
User.findAll({
    attributes: ['name', 'married'],
});

// SELECT name, age, FROM nodejs.users WHERE married = 1 AND age > 30;
User.findAll({
    attributes: ['name', 'age'],
    where: {
        married: true,
        /*
         * Op.gt(�ʰ�)
         * Op.gte(�̻�)
         * Op.lt(�̸�)
         * Op.lte(����)
         * Op.ne(�ٸ�)
         * Op.or(�Ǵ�)
         * Op.in(�迭 ��� �� �ϳ�)
         * Op.notIn(�迭 ��ҿ� ����)
         * */
        age: { [Op.gt]: 30 },
    },
});

// SELECT id, name FROM users WHERE married = 0 OR age > 30;
User.findAll({
    attributes: ['id', 'name'],
    where: {
        [Op.or]: [{ married: false }, { age: { [Op.gt]: 30 } }],
    },
});

// SELECT id, name FROM users ORDER BY age DESC;
User.findAll({
    attributes: ['id', 'name'],
    order: [['age', 'DESC']],
});

// SELECT id, name FROM users ORDER BY age DESC LIMIT 1 OFFSET 1;
User.findAll({
    attributes: ['id', 'name'],
    order: [['age', 'DESC']],
    limit: 1,
    offset: 1,
});

// UPDATE nodejs.users SET comment = '�ٲ� ����' WHERE id = 2;
User.update({
    comment: '�ٲ� ����',
}, {
    where: { id: 2 },
});

// DELETE FROM nodejs.users WHERE id = 2;
User.destroy({
    where: { id: 2 },
});

// ���� ����
const user = await User.findOne({
    include: [{
        model: Comment,
        where: {
            id: 1,
        },
        attributes: ['id'],
    }]
});

const user = await User.findOne({});
const comment = await Comment.create();
await user.addComment(comment);

// ���� ����
const [result, metadata] = await sequelize.query('SELECT * from comments');
console.log(result);

