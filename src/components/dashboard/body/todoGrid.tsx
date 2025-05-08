"use client";
import { useTodoStore } from "@/store/store";
import type { TodoListInterface } from "@/types/todoListInterface";
import { useParams } from "next/navigation";
import TodoItems from "./todoItem";

export default function TodoGrid() {
  const todoLists = useTodoStore(state => state.todoLists);
  const { id } = useParams();

  const listId = Array.isArray(id) ? id[0] : id;

  if (!listId) {
    return <div className="p-10 text-red-500 text-xl">Todo not found</div>;
  }

  const list: TodoListInterface | undefined = todoLists.find(
    todo => todo.id === listId,
  );

  if (!list) {
    return <div className="p-10 text-red-500 text-xl">Список не знайдений</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-10 p-10 text-2xl text-title">
      {list?.todoList.map(todo => (
        <TodoItems
          key={todo.id}
          todoListId={listId}
          id={todo.id}
          title={todo.title}
          description={todo.description}
          completed={todo.completed}
          admin={list.admin}
        />
      ))}
    </div>
  );
}
