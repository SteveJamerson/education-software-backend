import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChallengesModule } from './challenges/challenges.module';
import { ProjectsModule } from './projects/projects.module';
import { SchoolsModule } from './schools/schools.module';
import { StudentsModule } from './students/students.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
    imports: [
        SchoolsModule,
        StudentsModule,
        TasksModule,
        ChallengesModule,
        ProjectsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
