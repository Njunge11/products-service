'use strict';

import { uniqueId } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import ProductImage from './productimage';

export default (sequelize: Sequelize, DataTypes: any) => {
    const productImage = ProductImage(sequelize, DataTypes);
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models: any) {
            // define association here
        }
    }
    Product.init(
        {
            id: { primaryKey: true, type: DataTypes.UUID },
            subCategoryID: DataTypes.UUID,
            productName: DataTypes.STRING,
            productPrice: DataTypes.DECIMAL,
            productStatus: DataTypes.ENUM(
                'draft',
                'deletedDraft',
                'available',
                'deleted',
                'expired',
                'reserved',
                'sold',
                'returned'
            ),
        },
        {
            sequelize,
            modelName: 'products',
            indexes: [
                {
                    unique: true,
                    fields: ['productStatus'],
                },
            ],
        }
    );
    Product.hasMany(productImage);
    productImage.belongsTo(Product);
    return Product;
};
