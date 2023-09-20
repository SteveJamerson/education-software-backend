import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCpfAndCnpjTable1695218323170 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'students',
            new TableColumn({
                name: 'cpf',
                type: 'varchar',
                isUnique: true,
            }),
        );
        await queryRunner.addColumn(
            'schools',
            new TableColumn({
                name: 'cnpj',
                type: 'varchar',
                isUnique: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('schools', 'cnpj');
        await queryRunner.dropColumn('students', 'cpf');
    }
}
