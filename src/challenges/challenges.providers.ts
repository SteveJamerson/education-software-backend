import { Student } from '@/students/entities/student.entity';
import { DataSource } from 'typeorm';
import { Challenge } from './entities/challenge.entity';

export const challengesProviders = [
    {
        provide: 'CHALLENGES_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Challenge),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'STUDENTS_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Student),
        inject: ['DATA_SOURCE'],
    },
];
