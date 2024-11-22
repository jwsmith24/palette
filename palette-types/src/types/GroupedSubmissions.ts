import { Submission } from "./Submission";

export type GroupedSubmissions = Record<number | "no-group", Submission[]>;
