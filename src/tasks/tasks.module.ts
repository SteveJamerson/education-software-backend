import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { tasksProviders } from './tasks.providers';
import { TasksService } from './tasks.service';

@Module({
    imports: [DatabaseModule],
    controllers: [TasksController],
    providers: [...tasksProviders, TasksService],
})
export class TasksModule {}
