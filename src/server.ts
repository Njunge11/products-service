import 'dotenv/config';
import express from 'express';
import Database from './utils/db';
import CategoryRouter from './resources/category/category.router';
import ProductRouter from './resources/product/product.router';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './graphql-schema/schema';
import { rootValue } from './graphql-resolvers/rootValue';
import cors from 'cors';
import helmet from 'helmet';

export default class Server {
    private app;
    private PORT = 3000;
    private connect;
    private categoryRouter;
    private productRouter;
    constructor() {
        this.app = express();
        this.connect = new Database().connect();
        this.categoryRouter = new CategoryRouter();
        this.productRouter = new ProductRouter();
    }

    private routeRequests(): void {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(
            '/documentation',
            swaggerUi.serve,
            swaggerUi.setup(swaggerDocument)
        );
        this.app.use('/api/v1/', this.categoryRouter.Router);
        this.app.use('/api/v1/', this.productRouter.Router);
        this.app.use(
            '/graphql',
            graphqlHTTP({
                schema: schema,
                rootValue,
                graphiql: true,
            })
        );
    }

    public startServer = async (): Promise<void> => {
        this.routeRequests();
        try {
            await this.connect.authenticate();
            console.log(`Database connection successful`);
            this.app.listen(this.PORT, () => {
                console.log(`Server is running on port ${this.PORT}`);
            });
        } catch (error) {
            console.error(error);
        }
    };
}
