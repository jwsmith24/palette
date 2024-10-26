import { Criteria } from "./criteria.ts";

export interface Cluster {
  title: string;
  criteria: Criteria[];
  description: string;
  id: number;
  key: string; // unique key for React DOM (with uuid)

}