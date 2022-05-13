import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./Task";

@Entity()
export class Machine {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    maxNumOfTasks: number;
    
    @OneToMany(type => Task, task => task.machine, {
        eager: true
    })
    tasks: Task[];
}