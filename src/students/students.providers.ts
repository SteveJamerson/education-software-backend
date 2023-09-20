import { Challenge } from '@/challenges/entities/challenge.entity';
import { Project } from '@/projects/entities/project.entity';
import { School } from '@/schools/entities/school.entity';
import { Student } from '@/students/entities/student.entity';
import { Task } from '@/tasks/entities/task.entity';
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
    {
        provide: 'TASKS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'CHALLENGES_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Challenge),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'PROJECTS_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Project),
        inject: ['DATA_SOURCE'],
    },
];
