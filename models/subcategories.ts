'use strict';
import { Model, Sequelize } from 'sequelize';
export default (sequelize: Sequelize, DataTypes: any) => {
    class subCategories extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models: any) {
            // define association here
        }
    }
    subCategories.init(
        {
            id: { primaryKey: true, type: DataTypes.UUID },
            parentCategoryId: DataTypes.UUID,
            categoryName: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'subCategories',
        }
    );
    return subCategories;
};
