import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Machine } from "./Machine";
import { Work } from "./Work";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => Machine, machine => machine.tasks, {
        onDelete: "CASCADE",
        nullable: true
    })
    machine: Machine;

    @ManyToOne(type => Work, work => work.tasks, {
        nullable: true,
        deferrable: "INITIALLY DEFERRED"
    })
    work: Work;
}