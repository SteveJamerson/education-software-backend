import { Challenge } from '@/challenges/entities/challenge.entity';
import { Task } from '@/tasks/entities/task.entity';
import { IsString } from 'class-validator';

export class StudentDTO {
    @IsString()
    readonly name: string;

    @IsString()
    readonly cpf: string;

    @IsString({ each: true })
    readonly schools: string[];

    readonly task: Task;
    readonly challenge: Challenge;
}
