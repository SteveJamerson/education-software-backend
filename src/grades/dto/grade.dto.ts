import { IsInt, Max, Min } from 'class-validator';

export class GradeDTO {
    @IsInt()
    @Min(0)
    @Max(100)
    readonly grade: number;

    @IsInt()
    @Min(0)
    @Max(100)
    readonly weight: number;
}
