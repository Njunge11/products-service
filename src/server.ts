import express from 'express';

export default class Server {
    private app: express.Application;
    private PORT = 3000;
    constructor() {
        this.app = express();
    }

    private routeRequests(): void {
        this.app.get('/', (req: express.Request, res: express.Response) => {
            res.status(200).send('Hello worldd');
        });
    }

    public startServer = async (): Promise<void> => {
        this.routeRequests();
        try {
            this.app.listen(this.PORT, () => {
                console.log(`Server is running on port ${this.PORT}`);
            });
        } catch (error) {
            console.error(error);
        }
    };
}
