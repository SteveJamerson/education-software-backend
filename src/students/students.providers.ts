import { School } from '@/schools/entities/school.entity';
import { Student } from '@/students/entities/student.entity';
import { DataSource } from 'typeorm';

export const studentsProviders = [
    {
        provide: 'STUDENTS_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Student),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'SCHOOLS_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(School),
        inject: ['DATA_SOURCE'],
    },
];
