import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { GradeDTO } from './grade.dto';

export class GradeUpdateDTO extends PartialType(GradeDTO) {
    @IsString()
    readonly studentId: string;
}
