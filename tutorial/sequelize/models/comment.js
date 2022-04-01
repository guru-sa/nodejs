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
            timestamps: false, // true 일 경우 createdAt과 updatedAt 컬럼 추가
            modelName: 'Comment',
            tableName: 'comments',
            paranoid: false, // true 일 경우 deletedAt 컬럼 추가
            charset: 'utf8mb4', // 한글 입력(이모티콘 포함)
            collate: 'utf8mb4-general_ci', // 한글 입력(이모티콘 포함)
        });
    }
    static associate(db) {
        // 1:N
        db.Comment.belongTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
    }
};