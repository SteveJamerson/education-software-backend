import { Student } from '@/students/entities/student.entity';
import { DataSource } from 'typeorm';
import { Task } from './entities/task.entity';

export const tasksProviders = [
    {
        provide: 'TASKS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'STUDENTS_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Student),
        inject: ['DATA_SOURCE'],
    },
];
