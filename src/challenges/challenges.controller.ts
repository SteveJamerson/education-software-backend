import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengeCreateDTO } from './dto/challengeCreate.dto';
import { ChallengeUpdateDTO } from './dto/challengeUpdate.dto';

@Controller('grades/challenges')
export class ChallengesController {
    constructor(private readonly challengesService: ChallengesService) {}

    @Get()
    findAll() {
        return this.challengesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.challengesService.findOne(id);
    }

    @Post()
    create(@Body() data: ChallengeCreateDTO) {
        return this.challengesService.create(data);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: ChallengeUpdateDTO) {
        return this.challengesService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.challengesService.remove(id);
    }
}
