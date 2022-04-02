import { Sequelize } from 'sequelize';
import Config from '../config/index';

export default class Database {
    private sequelize: Sequelize;
    private databaseURL: string;
    private config: Config;
    constructor() {
        this.config = new Config();
        this.databaseURL = this.config.getConfig().DATABASE_URL;
        this.sequelize = new Sequelize(this.databaseURL, { dialect: 'mysql' });
    }

    public connect(): Sequelize {
        return this.sequelize;
    }
}
