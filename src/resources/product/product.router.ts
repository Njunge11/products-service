import express, { Router } from 'express';
import ProductController from './product.controller';
import Product from '../../../models/product';
import Database from '../../utils/db';
import Sequelize from 'sequelize';

export default class ProductRouter {
    private router;
    private productController;
    private product;
    private sequelize;
    constructor() {
        this.router = Router();
        this.productController = new ProductController();
        this.sequelize = new Database().connect();
        this.product = Product(this.sequelize, Sequelize.DataTypes);
    }

    public setState = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        const result = await this.product.findByPk(req.params.id);
        if (!result) {
            return res.status(400).send({ message: 'Data not found' });
        }
        if (!req.body.state) {
            return res.status(400).send({ message: 'State not provided' });
        }
        req.currentState = result.dataValues.productStatus;
        req.nextState = req.body.state;
        next();
    };

    get Router() {
        this.router.get('/products', this.productController.getProducts);
        this.router.put(
            '/products/:id',
            this.setState,
            this.productController.updateProductStateById
        );
        return this.router;
    }
}
