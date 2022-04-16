export default class TestEnvConfig {
    public getConfig(): object {
        return {
            DATABASE_URL: process.env.JAWSDB_URL,
        };
    }
}
