'use strict';
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        const subcategories = await queryInterface.sequelize.query(
            `select id from subCategories`
        );
        const products = [];
        const statuses = [
            'draft',
            'deletedDraft',
            'available',
            'deleted',
            'expired',
            'reserved',
            'sold',
            'returned',
        ];
        subcategories[0].map((subCategory) => {
            const subCategoryId = subCategory.id;
            for (let i = 0; i < 200; i++) {
                const productPrice = faker.commerce.price();
                const productName = faker.commerce.productName();
                products.push({
                    id: uuidv4(),
                    subCategoryId,
                    productPrice,
                    productName,
                    productStatus:
                        statuses[Math.floor(Math.random() * statuses.length)],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
            }
        });
        await queryInterface.bulkInsert('products', products);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('products', null, {});
    },
};
