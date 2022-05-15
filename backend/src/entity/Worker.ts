import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Work } from "./Work";

export enum Status {
    WORKING = "Working",
    FREE = 'Free',
    ON_LEAVE ="On leave"
}

@Entity()
export class Worker {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    qualification: string;

    @Column()
    salary: number;

    @Column({
        type: "enum",
        enum: Status
    })
    status: Status
    
    @ManyToMany(type => Work, work => work.workers, {
        nullable: true,
        eager: true
    })
    works: Work[];
}
