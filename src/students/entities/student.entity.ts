import { School } from '@/schools/entities/school.entity';
import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('students')
export class Student {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        unique: true,
        length: 11,
    })
    cpf: string;

    @ManyToMany(() => School, (school) => school.students)
    schools: School[];

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @BeforeInsert()
    generatedId() {
        if (this.id) return;
        this.id = uuid();
    }
}
