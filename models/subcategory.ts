'use strict';

import { Sequelize, Model } from 'sequelize';
export default (sequelize: Sequelize, DataTypes: any) => {
    class SubCategory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models: any) {
            // define association here
        }
    }
    SubCategory.init(
        {
            id: { primaryKey: true, type: DataTypes.UUID },
            parentId: DataTypes.UUID,
            categoryName: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'subCategories',
        }
    );

    return SubCategory;
};
