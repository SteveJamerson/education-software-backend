import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { SchoolsController } from './schools.controller';
import { schoolsProviders } from './schools.providers';
import { SchoolsService } from './schools.service';

@Module({
    imports: [DatabaseModule],
    controllers: [SchoolsController],
    providers: [...schoolsProviders, SchoolsService],
})
export class SchoolsModule {}
