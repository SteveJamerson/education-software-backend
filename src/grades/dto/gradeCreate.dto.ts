import { IsString } from 'class-validator';
import { GradeDTO } from './grade.dto';

export class GradeCreateDTO extends GradeDTO {
    @IsString()
    readonly studentId: string;
}
