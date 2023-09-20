import { IsString } from 'class-validator';

export class StudentDTO {
    @IsString()
    readonly name: string;

    @IsString()
    readonly schools: string[];
}
