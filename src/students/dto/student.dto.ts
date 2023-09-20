import { IsString } from 'class-validator';

export class StudentDTO {
    @IsString()
    readonly name: string;

    @IsString()
    readonly cpf: string;

    @IsString({ each: true })
    readonly schools: string[];
}
