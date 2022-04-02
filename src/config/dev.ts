export default class DevelopmentEnvConfig {
    public getConfig(): object {
        return {
            DATABASE_URL: process.env.DATABASE_DEVELOPMENT_URL,
        };
    }
}
