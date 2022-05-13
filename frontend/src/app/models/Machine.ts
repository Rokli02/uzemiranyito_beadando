import { Task } from "./Task";

export interface Machine {
  id: number;
  type: string;
  maxNumOfTasks: number;
  tasks: Task[];
}
