import express from 'express';
import Database from '../../utils/db';
import Sequelize from 'sequelize';
import Category from '../../../models/category';
import SubCategory from '../../../models/subcategory';

export default class CategoryController {
    private sequelize;
    private categories;
    private subCategories;
    constructor() {
        this.sequelize = new Database().connect();
        this.categories = Category(this.sequelize, Sequelize.DataTypes);
        this.subCategories = SubCategory(this.sequelize, Sequelize.DataTypes);
    }

    public fetchCategories = async (parentId: string) => {
        if (parentId) {
            return await this.subCategories.findAll({
                where: { parentId },
            });
        }
        return await this.categories.findAll();
    };
    public getCategories = async (
        req: express.Request,
        res: express.Response
    ): Promise<express.Response | void> => {
        try {
            const categories = await this.fetchCategories(req.params.id);
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
