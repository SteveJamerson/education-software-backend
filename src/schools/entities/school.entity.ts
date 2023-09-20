import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('schools')
export class School {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true,
    })
    name: string;

    @Column()
    categorie: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @BeforeInsert()
    generatedId() {
        if (this.id) return;
        this.id = uuid();
    }
}
