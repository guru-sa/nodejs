const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            // columns
            comment: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW,
            },
        }, {
            // table option
            sequelize,
            timestamps: false, // true �� ��� createdAt�� updatedAt �÷� �߰�
            modelName: 'Comment',
            tableName: 'comments',
            paranoid: false, // true �� ��� deletedAt �÷� �߰�
            charset: 'utf8mb4', // �ѱ� �Է�(�̸�Ƽ�� ����)
            collate: 'utf8mb4-general_ci', // �ѱ� �Է�(�̸�Ƽ�� ����)
        });
    }
    static associate(db) {
        // 1:N
        db.Comment.belongTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
    }
};