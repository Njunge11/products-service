import ProductController from '../resources/product/product.controller';

export default class Products {
    public getProducts = async ({ state, page, limit }: any) => {
        const result = await new ProductController().fetchProducts(
            state,
            parseInt(page),
            parseInt(limit)
        );
        return result;
    };
}
