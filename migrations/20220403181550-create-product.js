'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('products', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            subCategoryID: {
                allowNull: false,
                type: Sequelize.UUID,
                delete: 'CASCADE',
                references: {
                    model: 'subCategories',
                    key: 'id',
                },
            },
            productName: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            productPrice: {
                allowNull: false,
                type: Sequelize.DECIMAL,
            },
            productStatus: {
                allowNull: false,
                type: Sequelize.ENUM(
                    'draft',
                    'deletedDraft',
                    'available',
                    'deleted',
                    'expired',
                    'reserved',
                    'sold',
                    'returned'
                ),
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
        await queryInterface.dropTable('products');
    },
};
