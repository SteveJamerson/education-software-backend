import { DatabaseModule } from '@/database/database.module';
import { Module } from '@nestjs/common';
import { ChallengesController } from './challenges.controller';
import { challengesProviders } from './challenges.providers';
import { ChallengesService } from './challenges.service';

@Module({
    imports: [DatabaseModule],
    controllers: [ChallengesController],
    providers: [...challengesProviders, ChallengesService],
})
export class ChallengesModule {}
