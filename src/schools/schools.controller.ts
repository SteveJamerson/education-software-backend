import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { SchoolCreateDTO } from './dto/schoolCreate.dto';
import { SchoolUpdateDTO } from './dto/schoolUpdate.dto';
import { SchoolsService } from './schools.service';

@Controller('schools')
export class SchoolsController {
    constructor(private readonly schoolsService: SchoolsService) {}

    @Get()
    findAll() {
        return this.schoolsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.schoolsService.findOne(id);
    }

    @Post()
    create(@Body() schoolData: SchoolCreateDTO) {
        return this.schoolsService.create(schoolData);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() schoolData: SchoolUpdateDTO) {
        return this.schoolsService.update(id, schoolData);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.schoolsService.remove(id);
    }
}
