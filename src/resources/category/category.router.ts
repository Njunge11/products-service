import { Router } from 'express';
import CategoryController from './category.controller';

export default class CategoryRouter {
    private router;
    private categoryController;
    constructor() {
        this.router = Router();
        this.categoryController = new CategoryController();
    }

    get Router() {
        this.router.get('/', this.categoryController.getCategories);
        return this.router;
    }
}
