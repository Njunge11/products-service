'use strict';
const { v4: uuidv4 } = require('uuid');

const subCategories = {
    Fashion: [
        "WOMEN'S FASHION",
        "MEN'S FASHION",
        'BABY',
        "KID'S FASHION",
        'EXCLUSIVE FASHION',
    ],
    'Baby Products': [
        'DIAPERING',
        'GEAR',
        'BATHING & SKIN CARE',
        'APPAREL & ACCESSORIES',
        'BABY & TODDLER TOYS',
        'FEEDING',
        'BABY SAFETY',
        'POTTY TRAINING',
        'HEALTH & BABY CARE',
    ],
    'Health & Beauty': [
        'HAIR CARE',
        'FRAGRANCES',
        "MEN'S GROOMING",
        'PERSONAL CARE',
        'MAKEUP',
        'LUXURY BEAUTY',
    ],
    Computing: [
        'LAPTOPS',
        'COMPUTERS & ACCESSORIES',
        'COMPUTER DATA STORAGE',
        'COMPUTER COMPONENTS',
        'SHOP BY LAPTOP BRANDS',
    ],
    'Phones & Tablets': [
        'MOBILE PHONES',
        'ACCESSORIES',
        'TABLETS',
        'TOP SMARTPHONE BRANDS',
        'BEST SELLERS SMARTPHONES',
        'NEW SMARTPHONE LAUNCHES',
    ],
    Gaming: [
        'PLAYSTATION',
        'DIGITAL GAMES',
        'NINTENDO',
        'PC GAMING',
        'SONY PSP',
    ],
    'Sporting Goods': [
        'SPORTS & FITNESS',
        'SPORTS NUTRITION',
        'OUTDOOR RECREATION',
    ],
    Electronics: [
        'TELEVISIONS',
        'HOME AUDIO',
        'ACCESSORIES & SUPPLIES',
        'CAMERAS',
        'BEST SELLER TV BRANDS',
    ],
    'Garden & Outdoors': [
        'GARDENING & LAWN CARE',
        'GRILLING & OUTDOOR COOKING',
        'OUTDOOR DECOR',
        'PATIO FURNITURE & ACCESSORIES',
        'FARM & RANCH',
    ],
    'Home & Office': [
        'HOME KITCHEN',
        'SMALL APPLIANCES',
        'LARGE APPLIANCES',
        'COOKING APPLIANCES',
        'OFFICE PRODUCTS',
    ],
};
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
        const categories = await queryInterface.sequelize.query(
            `select id, categoryName from categories`
        );
        const childCategories = [];
        categories[0].map((category) => {
            const parentId = category.id;
            const categoryName = category.categoryName;
            subCategories[categoryName].map((name) => {
                childCategories.push({
                    id: uuidv4(),
                    parentId,
                    categoryName: name.toLowerCase(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
            });
        });
        await queryInterface.bulkInsert('subCategories', childCategories);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('subCategories', null, {});
    },
};
