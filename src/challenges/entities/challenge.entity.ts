import { Student } from '@/students/entities/student.entity';
import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('challenges')
export class Challenge {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    grade: number;

    @Column()
    weight: number;

    @OneToOne(() => Student, (student) => student.challenge)
    @JoinColumn()
    student: Student;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @BeforeInsert()
    generatedId() {
        if (this.id) return;
        this.id = uuid();
    }
}
