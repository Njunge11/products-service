import { merge } from 'lodash';
import DevelopmentEnvConfig from './dev';
import TestEnvConfig from './test';

export default class Config {
    private env: string;
    private config: object;
    private development: DevelopmentEnvConfig;
    private test: TestEnvConfig;

    constructor() {
        this.env = process.env.NODE_ENV || 'development';
        this.config = { env: this.env };
        this.development = new DevelopmentEnvConfig();
        this.test = new TestEnvConfig();
    }

    public getConfig(): any {
        let envConfig;
        switch (this.env) {
            case 'development':
                envConfig = this.development.getConfig();
                break;
            default:
                envConfig = this.test.getConfig();
                break;
        }
        return merge(this.config, envConfig);
    }
}
