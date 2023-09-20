import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { studentsProviders } from './students.providers';
import { StudentsService } from './students.service';

@Module({
    imports: [DatabaseModule],
    controllers: [StudentsController],
    providers: [...studentsProviders, StudentsService],
})
export class StudentsModule {}
