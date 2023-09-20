import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SchoolCreateDTO } from './dto/schoolCreate.dto';
import { SchoolUpdateDTO } from './dto/schoolUpdate.dto';
import { School } from './entities/school.entity';

@Injectable()
export class SchoolsService {
    constructor(
        @Inject('SCHOOLS_REPOSITORY')
        private schoolsRepository: Repository<School>,
    ) {}

    async findAll() {
        return this.schoolsRepository.find({});
    }

    async findOne(id: string) {
        const school = await this.schoolsRepository.findOne({
            where: { id },
        });

        if (!school) throw new NotFoundException(`School ID ${id} not found`);

        return school;
    }

    async create(schoolData: SchoolCreateDTO) {
        const school = this.schoolsRepository.create(schoolData);
        return this.schoolsRepository.save(school);
    }

    async update(id: string, schoolData: SchoolUpdateDTO) {
        const school = await this.schoolsRepository.preload({
            id,
            ...schoolData,
        });

        if (!school) throw new NotFoundException(`School ID ${id} not found`);

        return this.schoolsRepository.save(school);
    }

    async remove(id: string) {
        const school = await this.schoolsRepository.findOne({
            where: { id },
        });

        if (!school) throw new NotFoundException(`School ID ${id} not found`);

        return this.schoolsRepository.remove(school);
    }
}
