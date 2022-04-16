'use strict';

import { Sequelize, Model } from 'sequelize';
export default (sequelize: Sequelize, DataTypes: any) => {
    class ProductImage extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models: any) {
            // define association here
        }
    }
    ProductImage.init(
        {
            id: { primaryKey: true, type: DataTypes.UUID },
            productId: DataTypes.UUID,
            url: DataTypes.STRING,
            mainImage: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'productImages',
        }
    );

    return ProductImage;
};
