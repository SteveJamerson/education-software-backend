import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ProjectCreateDTO } from './dto/projectCreate.dto';
import { ProjectUpdateDTO } from './dto/projectUpdate.dto';
import { ProjectsService } from './projects.service';

@Controller('grades/projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Get()
    findAll() {
        return this.projectsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.projectsService.findOne(id);
    }

    @Post()
    create(@Body() data: ProjectCreateDTO) {
        return this.projectsService.create(data);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: ProjectUpdateDTO) {
        return this.projectsService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.projectsService.remove(id);
    }
}
