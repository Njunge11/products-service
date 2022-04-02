import 'dotenv/config';
import express from 'express';
import { Sequelize } from 'sequelize/types';
import Database from './utils/db';

export default class Server {
    private app: express.Application;
    private PORT = 3000;
    private connect: Sequelize;
    constructor() {
        this.app = express();
        this.connect = new Database().connect();
    }

    private routeRequests(): void {
        this.app.get('/', (req: express.Request, res: express.Response) => {
            res.status(200).send('Helsdsdsds dloworldd');
        });
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
