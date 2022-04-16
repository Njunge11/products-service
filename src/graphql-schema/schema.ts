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

            type result {
                id:String
                subCategoryID: String
                productName: String
                productPrice: String
                productStatus: String
                productImages:[productImages]
                createdAt: String
                updatedAt: String
            }

            type nextValues {
                page:Int
                limit:Int
            }

            type previousValues {
                page:Int
                limit:Int
            }

            type response {
                data:[result]
                totalCount:Int 
                next:nextValues
                previous:previousValues
            }
          
            type Products {
                getProducts(state:String page:String limit:String):response
            }

            type Query {
                categories:Categories
                products:Products
            }`
);
