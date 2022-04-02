import express from 'express';
import Database from '../../utils/db';
import Sequelize from 'sequelize';
import categories from '../../../models/categories';
import subcategories from '../../../models/subcategories';

export default class CategoryController {
    private sequelize;
    private categories;
    private subCategories;
    constructor() {
        this.sequelize = new Database().connect();
        this.categories = categories(this.sequelize, Sequelize.DataTypes);
        this.subCategories = subcategories(this.sequelize, Sequelize.DataTypes);
    }
    public getCategories = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response | void> => {
        try {
            const categories = await this.categories.findAll({
                include: this.subCategories,
            });
            if (categories.length === 0) {
                return res.status(400).send({ message: 'Data not found' });
            }
            res.status(200).send({ data: categories });
        } catch (error) {
            console.log(error);
            res.status(500).end();
        }
    };
}
