import type { Timestamp } from "firebase/firestore";
import type { TodoItem } from "./TodoItemTypes";

export interface TodoListInterface {
  id: string;
  name: string;
  createdBy: string;
  users: string[];
  admin: string[];
  todoList: TodoItem[];
  createdAt: Timestamp;
}
