import { buildSchema } from 'graphql';
export const schema = buildSchema(
    `
            type categoryDataValues{
                id:String
                categoryName:String
                createdAt:String
                updatedAt:String
            }
            
            type Categories {
                getCategories(parentId: String):[categoryDataValues]
            }

            type productImages {
            id: String
            productId: String
            url:String
            mainImage: Boolean
            }

            type productDataValues {
                id:String
                subCategoryID: String
                productName: String
                productPrice: String
                productStatus: String
                productImages:[productImages]
                createdAt: String
                updatedAt: String
            }
          
            type Products {
                getProducts(state:String):[productDataValues]
            }

            type Query {
                categories:Categories
                products:Products
            }`
);
