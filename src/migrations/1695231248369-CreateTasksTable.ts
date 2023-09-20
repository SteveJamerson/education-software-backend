import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

const tableName = 'tasks';

export class CreateTasksTable1695231248369 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: tableName,
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isUnique: true,
                    },
                    {
                        name: 'grade',
                        type: 'int',
                    },
                    {
                        name: 'weight',
                        type: 'int',
                    },
                    {
                        name: 'studentId',
                        type: 'uuid',
                        isUnique: true,
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
                name: `${tableName}_student`,
                columnNames: ['studentId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'students',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(tableName, `${tableName}_student`);
        await queryRunner.dropTable(tableName);
    }
}
