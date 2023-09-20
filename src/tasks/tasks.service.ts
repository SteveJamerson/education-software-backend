import { Student } from '@/students/entities/student.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TaskCreateDTO } from './dto/taskCreate.dto';
import { TaskUpdateDTO } from './dto/taskUpdate.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
    constructor(
        @Inject('TASKS_REPOSITORY')
        private tasksRepository: Repository<Task>,
        @Inject('STUDENTS_REPOSITORY')
        private studentsRepository: Repository<Student>,
    ) {}

    async findAll() {
        return this.tasksRepository.find({
            relations: ['student'],
        });
    }

    async findOne(id: string) {
        const task = await this.tasksRepository.findOne({
            where: { id },
            relations: ['student'],
        });

        if (!task) {
            throw new NotFoundException(`Task ID ${id} not found`);
        }

        return task;
    }

    async create({ studentId, ...data }: TaskCreateDTO) {
        const student = await this.preloadStudentById(studentId);

        const task = this.tasksRepository.create({
            ...data,
            student,
        });

        return this.tasksRepository.save(task);
    }

    async update(id: string, { studentId, ...data }: TaskUpdateDTO) {
        const student = await this.preloadStudentById(studentId);

        const task = await this.tasksRepository.preload({
            id,
            ...data,
            student,
        });

        if (!task) throw new NotFoundException(`Task ID ${id} not found`);

        return this.tasksRepository.save(task);
    }

    async remove(id: string) {
        const task = await this.tasksRepository.findOne({
            where: { id },
        });

        if (!task) {
            throw new NotFoundException(`Task ID ${id} not found`);
        }

        return this.tasksRepository.remove(task);
    }

    private async preloadStudentById(id: string) {
        const student = await this.studentsRepository.findOne({
            where: { id },
            relations: ['task', 'challenge', 'project'],
        });

        if (student) {
            return student;
        } else {
            throw new NotFoundException(`School ID ${id} not found`);
        }
    }
}
