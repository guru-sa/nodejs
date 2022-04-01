const Sequlize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            // columns
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            age: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            married: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            // table option
            sequelize,
            timestamps: false, // true 일 경우 createdAt과 updatedAt 컬럼 추가
            underscored: false, // camel case -> snake case
            modelName: 'User',
            tableName: 'users',
            paranoid: false, // true 일 경우 deletedAt 컬럼 추가
            charset: 'utf8', // 한글 입력(이모티콘까지 필요할 경우 utf8mb4)
            collate: 'utf8-general_ci', // 한글 입력(이모티콘까지 필요할 경우 utf8mb4_general_ci)
        });
    }
    static associate(db) {
        // 1:N
        db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
        /* 1:1
         * db.User.hasOne(db.Info, { foreignKey: 'UserId', sourceKey: 'id' });
         * db.Info.belongTo(db.User, { foreignKey: 'UserId', targetKey: 'id' });
         * 
         * N:M
         * db.Post.belongToMany(db.Hashtag, { through: 'PostHashtag' });
         * db.Hashtag.belongToMany(db.Post, { through: 'PostHashtag' });
         * */
    }
};