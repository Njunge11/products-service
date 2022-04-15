'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('productImages', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            productId: {
                allowNull: false,
                type: Sequelize.UUID,
                delete: 'CASCADE',
                references: {
                    model: 'products',
                    key: 'id',
                },
            },
            url: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            mainImage: {
                allowNull: false,
                defaultValue: false,
                type: Sequelize.BOOLEAN,
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
        await queryInterface.dropTable('productImages');
    },
};
