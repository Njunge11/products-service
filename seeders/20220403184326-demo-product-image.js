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
        const products = await queryInterface.sequelize.query(
            `select id from products`
        );
        const productImages = [];
        products[0].map((product) => {
            const productId = product.id;
            productImages.push({
                id: uuidv4(),
                productId,
                url: faker.image.imageUrl(),
                mainImage: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        });
        await queryInterface.bulkInsert('productImages', productImages);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('productImages', null, {});
    },
};
