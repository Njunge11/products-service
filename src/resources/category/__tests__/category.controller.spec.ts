import 'dotenv/config';
import 'regenerator-runtime/runtime';
import CategoryController from '../category.controller';
import { isFunction } from 'lodash';
const categoryController = new CategoryController();

describe('category controller', () => {
    test('has getCategories function', () => {
        expect(isFunction(categoryController.getCategories)).toBe(true);
    });
});
