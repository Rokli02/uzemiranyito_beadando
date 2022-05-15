import { Task } from "./Task";
import { Worker } from "./Worker";

export interface Work {
  id: number;
  name: string;
  workers: Worker[];
  tasks: Task[];
}
