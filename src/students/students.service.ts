import { Challenge } from '@/challenges/entities/challenge.entity';
import { School } from '@/schools/entities/school.entity';
import { Task } from '@/tasks/entities/task.entity';
import { validateCPF } from '@/utils/functions/validations';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StudentCreateDTO } from './dto/studentCreate.dto';
import { StudentUpdateDTO } from './dto/studentUpdate.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
    constructor(
        @Inject('STUDENTS_REPOSITORY')
        private studentsRepository: Repository<Student>,
        @Inject('SCHOOLS_REPOSITORY')
        private schoolsRepository: Repository<School>,
        @Inject('TASKS_REPOSITORY')
        private tasksRepository: Repository<Task>,
        @Inject('CHALLENGE_REPOSITORY')
        private challengesRepository: Repository<Challenge>,
    ) {}

    async findAll() {
        return this.studentsRepository.find({
            relations: ['schools', 'task', 'challenge'],
        });
    }

    async findOne(id: string) {
        const student = await this.studentsRepository.findOne({
            where: { id },
            relations: ['schools', 'task', 'challenge'],
        });

        if (!student) throw new NotFoundException(`Student ID ${id} not found`);

        return student;
    }

    async create(studentData: StudentCreateDTO) {
        if (!validateCPF(studentData.cpf))
            throw new NotFoundException(
                `Student CPF ${studentData.cpf} invalid`,
            );

        const schools = await Promise.all(
            studentData.schools.map((id) => this.preloadSchoolById(id)),
        );

        const student = this.studentsRepository.create({
            ...studentData,
            schools,
        });
        return this.studentsRepository.save(student);
    }

    async update(id: string, studentData: StudentUpdateDTO) {
        if (!validateCPF(studentData.cpf))
            throw new NotFoundException(
                `Student CPF ${studentData.cpf} invalid`,
            );

        const schools =
            studentData.schools &&
            (await Promise.all(
                studentData.schools.map((id) => this.preloadSchoolById(id)),
            ));

        const student = await this.studentsRepository.preload({
            id,
            ...studentData,
            schools,
        });

        if (!student) throw new NotFoundException(`Student ID ${id} not found`);

        return this.studentsRepository.save(student);
    }

    async remove(id: string) {
        const student = await this.studentsRepository.findOne({
            where: { id },
        });

        if (!student) throw new NotFoundException(`Student ID ${id} not found`);

        return this.studentsRepository.remove(student);
    }

    private async preloadSchoolById(id: string) {
        const school = await this.schoolsRepository.findOne({
            where: { id },
        });

        if (school) {
            return school;
        } else {
            throw new NotFoundException(`School ID ${id} not found`);
        }
    }
}
