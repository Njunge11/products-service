import ProductController from '../resources/product/product.controller';

export default class Products {
    public getProducts = async ({ state }: any) => {
        const result = await new ProductController().fetchProducts(state);
        return result;
    };
}
