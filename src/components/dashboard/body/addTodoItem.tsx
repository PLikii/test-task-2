"use client";
import { useAuth } from "@/hooks/useAuth";
import { addTodoItem } from "@/services/addTodoItem";
import { useTodoStore } from "@/store/store";
import type { TodoListInterface } from "@/types/todoListInterface";
import { useParams } from "next/navigation";

export default function AdTodoItem() {
  const todoLists = useTodoStore(state => state.todoLists);
  const { id } = useParams();
  const list: TodoListInterface | undefined = todoLists.find(
    todo => todo.id === id,
  );
  const { user } = useAuth();
  const isAdmin = list?.admin?.includes(user?.email || "") ?? false;
  if (!list) {
    return <div className="p-10 text-red-500 text-xl">Список не знайдений</div>;
  }

  return (
    <div className="p-10 text-center text-3xl text-title">
      <h1>{list.name}</h1>
      {isAdmin ? (
        <button
          className="mt-5 rounded bg-blue-500 p-2 text-white"
          onClick={() => addTodoItem(id as string)}
        >
          Add task
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
