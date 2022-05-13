import { Machine } from "./Machine";
import { Work } from "./Work";

export interface Task {
  id: number;
  name: string;
  machine: Machine;
  work: Work;
}
