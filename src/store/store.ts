import type { TodoListInterface } from "@/types/todoListInterface";
import { create } from "zustand";

interface TodoStore {
  todoLists: TodoListInterface[];
  setTodoLists: (lists: TodoListInterface[]) => void;
  addTodo: (todo: TodoListInterface) => void;
}

export const useTodoStore = create<TodoStore>(set => ({
  todoLists: [],
  setTodoLists: lists => set({ todoLists: lists }),
  addTodo: todo => set(state => ({ todoLists: [...state.todoLists, todo] })),
}));
