import CategoryController from '../resources/category/category.controller';

export default class Categories {
    public getCategories = async ({ parentId }: any) => {
        const result = await new CategoryController().fetchCategories(parentId);
        return result;
    };
}
