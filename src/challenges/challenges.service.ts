import { Student } from '@/students/entities/student.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ChallengeCreateDTO } from './dto/challengeCreate.dto';
import { ChallengeUpdateDTO } from './dto/challengeUpdate.dto';
import { Challenge } from './entities/challenge.entity';

@Injectable()
export class ChallengesService {
    constructor(
        @Inject('CHALLENGES_REPOSITORY')
        private challengesRepository: Repository<Challenge>,
        @Inject('STUDENTS_REPOSITORY')
        private studentsRepository: Repository<Student>,
    ) {}

    async findAll() {
        return this.challengesRepository.find({
            relations: ['student'],
        });
    }

    async findOne(id: string) {
        const challenge = await this.challengesRepository.findOne({
            where: { id },
            relations: ['student'],
        });

        if (!challenge) {
            throw new NotFoundException(`Challenge ID ${id} not found`);
        }

        return challenge;
    }

    async create({ studentId, ...data }: ChallengeCreateDTO) {
        const student = await this.preloadStudentById(studentId);

        const challenge = this.challengesRepository.create({
            ...data,
            student,
        });

        return this.challengesRepository.save(challenge);
    }

    async update(id: string, { studentId, ...data }: ChallengeUpdateDTO) {
        const student = await this.preloadStudentById(studentId);

        const challenge = await this.challengesRepository.preload({
            id,
            ...data,
            student,
        });

        if (!challenge)
            throw new NotFoundException(`Challenge ID ${id} not found`);

        await this.challengesRepository.save(challenge);

        return student;
    }

    async remove(id: string) {
        const challenge = await this.challengesRepository.findOne({
            where: { id },
        });

        if (!challenge) {
            throw new NotFoundException(`Challenge ID ${id} not found`);
        }

        return this.challengesRepository.remove(challenge);
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
