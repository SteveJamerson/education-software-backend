import { Student } from '@/students/entities/student.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProjectCreateDTO } from './dto/projectCreate.dto';
import { ProjectUpdateDTO } from './dto/projectUpdate.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @Inject('PROJECTS_REPOSITORY')
        private projectsRepository: Repository<Project>,
        @Inject('STUDENTS_REPOSITORY')
        private studentsRepository: Repository<Student>,
    ) {}

    async findAll() {
        return this.projectsRepository.find({
            relations: ['student'],
        });
    }

    async findOne(id: string) {
        const project = await this.projectsRepository.findOne({
            where: { id },
            relations: ['student'],
        });

        if (!project) {
            throw new NotFoundException(`Project ID ${id} not found`);
        }

        return project;
    }

    async create({ studentId, ...data }: ProjectCreateDTO) {
        const student = await this.preloadStudentById(studentId);

        const project = this.projectsRepository.create({
            ...data,
            student,
        });

        return this.projectsRepository.save(project);
    }

    async update(id: string, { studentId, ...data }: ProjectUpdateDTO) {
        const student = await this.preloadStudentById(studentId);

        const project = await this.projectsRepository.preload({
            id,
            ...data,
            student,
        });

        if (!project) throw new NotFoundException(`Project ID ${id} not found`);

        return this.projectsRepository.save(project);
    }

    async remove(id: string) {
        const project = await this.projectsRepository.findOne({
            where: { id },
        });

        if (!project) {
            throw new NotFoundException(`Project ID ${id} not found`);
        }

        return this.projectsRepository.remove(project);
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
