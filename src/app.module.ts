import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolsModule } from './schools/schools.module';
import { StudentsModule } from './students/students.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
    imports: [SchoolsModule, StudentsModule, TasksModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
