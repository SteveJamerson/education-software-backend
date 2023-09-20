import { DataSource, DataSourceOptions } from 'typeorm';
import { CreateSchoolsTable1695176535556 } from './migrations/1695176535556-CreateSchoolsTable';

const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'postgres',
    entities: [__dirname + '/../**/*.entity.js'],
    synchronize: false,
};

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                ...dataSourceOptions,
            });
            return dataSource.initialize();
        },
    },
];

export const dataSource = new DataSource({
    ...dataSourceOptions,
    migrations: [CreateSchoolsTable1695176535556],
});
