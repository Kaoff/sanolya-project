import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { ConfigInterface } from 'config/config.interface';

const dbConfig = config.get<ConfigInterface['db']>('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: dbConfig.type as any,
    host: process.env.RDS_HOST || dbConfig.host,
    port: Number(process.env.RDS_PORT) || dbConfig.port,
    // authSource: process.env.RDS_AUTH_SOURCE || dbConfig.authSource,
    // database: process.env.RDS_DATABASE || dbConfig.database,
    // username: process.env.RDS_USERNAME || dbConfig.username,
    // password: process.env.RDS_PASSWORD || dbConfig.password,
    entities: [ __dirname + '/**/*.entity.{js,ts}' ],
    synchronize: process.env.TYPEORM_SYNC ? Boolean(process.env.TYPEORM_SYNC) : dbConfig.synchronize,
    useUnifiedTopology: true,
};
