import { Work } from "./Work";

export interface Worker {
  id: number;
  name: string;
  qualification: string;
  salary: number;
  status: Status;
  works: Work[];
}

export enum Status {
  WORKING = "Working",
  FREE = 'Free',
  ON_LEAVE ="On leave"
}
