'use strict';

import { Sequelize, Model } from 'sequelize';
import Subcategory from './subcategory';
export default (sequelize: Sequelize, DataTypes: any) => {
    const subcategory = Subcategory(sequelize, DataTypes);
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models: any) {
            // define association here
        }
    }
    Category.init(
        {
            id: { primaryKey: true, type: DataTypes.UUID },
            categoryName: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'categories',
        }
    );
    Category.hasMany(subcategory);

    return Category;
};
