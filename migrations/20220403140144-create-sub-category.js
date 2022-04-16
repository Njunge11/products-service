'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('subCategories', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            parentID: {
                allowNull: false,
                type: Sequelize.UUID,
                delete: 'CASCADE',
                references: {
                    model: 'categories',
                    key: 'id',
                },
            },
            categoryName: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('subCategories');
    },
};
