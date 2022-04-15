'use strict';
const { v4: uuidv4 } = require('uuid');
const categories = [
    {
        id: uuidv4(),
        categoryName: 'Health & Beauty',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        categoryName: 'Home & Office',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        categoryName: 'Phones & Tablets',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        categoryName: 'Computing',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        categoryName: 'Electronics',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        categoryName: 'Fashion',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        categoryName: 'Gaming',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        categoryName: 'Baby Products',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        categoryName: 'Sporting Goods',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: uuidv4(),
        categoryName: 'Garden & Outdoors',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

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

        await queryInterface.bulkInsert('categories', categories);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('categories', null, {});
    },
};
