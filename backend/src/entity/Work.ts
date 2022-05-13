import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./Task";
import { Worker } from "./Worker";

@Entity()
export class Work {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Worker, worker => worker.works)
    @JoinTable()
    workers: Worker[];

    @OneToMany(type => Task, task => task.work, {
        onDelete: "CASCADE",
        nullable: false,
        eager: true
    })
    tasks: Task[];
}