import 'dotenv/config';
import express from 'express';
import Database from './utils/db';
import CategoryRouter from './resources/category/category.router';

export default class Server {
    private app;
    private PORT = 3000;
    private connect;
    private categoryRouter;
    constructor() {
        this.app = express();
        this.connect = new Database().connect();
        this.categoryRouter = new CategoryRouter();
    }

    private routeRequests(): void {
        this.app.use('/api/v1/', this.categoryRouter.Router);
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
