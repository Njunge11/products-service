'use strict';
import { Model, Sequelize } from 'sequelize';
import subcategories from './subcategories';
export default (sequelize: Sequelize, DataTypes: any) => {
    const subCategories = subcategories(sequelize, DataTypes);
    class categories extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models: any) {
            // define association here
        }
    }
    categories.init(
        {
            id: { primaryKey: true, type: DataTypes.UUID },
            categoryName: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'categories',
        }
    );

    categories.hasOne(subCategories, { foreignKey: 'parentCategoryId' });
    subCategories.belongsTo(categories, { foreignKey: 'parentCategoryId' });

    return categories;
};
