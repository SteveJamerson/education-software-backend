import { Student } from '@/students/entities/student.entity';
import { DataSource } from 'typeorm';
import { Project } from './entities/project.entity';

export const projectsProviders = [
    {
        provide: 'PROJECTS_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Project),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'STUDENTS_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Student),
        inject: ['DATA_SOURCE'],
    },
];
