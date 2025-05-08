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
    return <div className="text-xl p-10 text-red-500">Список не знайдений</div>;
  }

  return (
    <div className="text-3xl p-10 text-title text-center">
      <h1>{list.name}</h1>
      {isAdmin ? (
        <button
          className="mt-5 p-2 bg-blue-500 text-white rounded"
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
