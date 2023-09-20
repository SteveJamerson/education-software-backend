import { PartialType } from '@nestjs/mapped-types';
import { SchoolDTO } from './school.dto';

export class SchoolUpdateDTO extends PartialType(SchoolDTO) {}
