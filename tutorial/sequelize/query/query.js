const { Op } = require('sequelize');
const { User } = require('../models');

// INSERT INTO nodejs.users (name, age, married, comment) VALUES ('zero', 24, 0, '자기소개');
User.create({
    name: 'zero',
    age: 24,
    married: false,
    comment: '자기소개',
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
         * Op.gt(초과)
         * Op.gte(이상)
         * Op.lt(미만)
         * Op.lte(이하)
         * Op.ne(다름)
         * Op.or(또는)
         * Op.in(배열 요소 중 하나)
         * Op.notIn(배열 요소에 없음)
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

// UPDATE nodejs.users SET comment = '바꿀 내용' WHERE id = 2;
User.update({
    comment: '바꿀 내용',
}, {
    where: { id: 2 },
});

// DELETE FROM nodejs.users WHERE id = 2;
User.destroy({
    where: { id: 2 },
});

// 관계 쿼리
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

// 직접 쿼리
const [result, metadata] = await sequelize.query('SELECT * from comments');
console.log(result);

