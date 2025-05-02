export type Filter = "all" | "active" | "completed";
export type Priority = "low" | "medium" | "high";

export interface Todo {
  id: string;
  text: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  priority: Priority;
}
