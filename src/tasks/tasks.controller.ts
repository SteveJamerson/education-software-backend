import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { TaskCreateDTO } from './dto/taskCreate.dto';
import { TaskUpdateDTO } from './dto/taskUpdate.dto';
import { TasksService } from './tasks.service';

@Controller('grades/tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    findAll() {
        return this.tasksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tasksService.findOne(id);
    }

    @Post()
    create(@Body() data: TaskCreateDTO) {
        return this.tasksService.create(data);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: TaskUpdateDTO) {
        return this.tasksService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tasksService.remove(id);
    }
}
