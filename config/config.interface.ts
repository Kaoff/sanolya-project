export interface ConfigInterface {
    db: {
        type: string;
        port: number;
        database: string;
        host?: string;
        username?: string;
        password?: string;
        synchronize?: boolean;
        authSource?: string;
    };

    jwt: {
        expiresIn: number;
        secret?: string;
    };

    server: {
        origin?: string;
        port: number;
    }
}