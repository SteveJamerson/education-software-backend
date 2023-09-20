import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

const tableName = 'schools_students';

export class CreateSchoolsStudentsTable1695178700211
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: tableName,
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'schoolsId',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'studentsId',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            tableName,
            new TableForeignKey({
                name: `${tableName}_schools`,
                columnNames: ['schoolsId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'schools',
            }),
        );

        await queryRunner.createForeignKey(
            tableName,
            new TableForeignKey({
                name: `${tableName}_students`,
                columnNames: ['studentsId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'students',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(tableName, `${tableName}_students`);

        await queryRunner.dropForeignKey(tableName, `${tableName}_schools`);

        await queryRunner.dropTable(tableName);
    }
}
