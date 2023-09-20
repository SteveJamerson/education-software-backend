import { IsString } from 'class-validator';

type SchoolCategories = 'data' | 'technology' | 'Product';

export class SchoolDTO {
    @IsString()
    readonly name: string;

    @IsString()
    readonly cnpj: string;

    @IsString()
    readonly categorie: SchoolCategories;
}
