import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolsModule } from './schools/schools.module';
import { StudentsModule } from './students/students.module';

@Module({
    imports: [SchoolsModule, StudentsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
