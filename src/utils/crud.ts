import Sequelze from 'sequelize';
import Database from './db';
import Product from '../../models/product';
export default class Crud {
    private sequelize;
    private product;
    constructor() {
        this.sequelize = new Database().connect();
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        this.product = Product(this.sequelize, Sequelze.DataTypes);
    }
    public updateProductStateById = async (
        nextState: string,
        productId: string
    ) => {
        try {
            console.log(nextState, '-----', productId);
            const products = await this.product.update(
                { productStatus: nextState },
                { where: { id: productId } }
            );
            console.log(products[0]);
            if (products[0] === 0) {
                return { success: false, message: 'not updated' };
            }
            return { success: true, message: 'updated' };
        } catch (error) {
            console.error(error);
            return { success: false, message: 'an error occured' };
        }
    };
}
