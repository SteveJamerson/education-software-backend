import { DataSource, DataSourceOptions } from 'typeorm';

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
    migrations: [],
});
