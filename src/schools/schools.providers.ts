import { School } from '@/schools/entities/school.entity';
import { DataSource } from 'typeorm';

export const schoolsProviders = [
    {
        provide: 'SCHOOLS_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(School),
        inject: ['DATA_SOURCE'],
    },
];
