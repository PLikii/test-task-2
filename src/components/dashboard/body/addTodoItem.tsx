'use client'
import { useTodoStore } from "@/store/store";
import { TodoListInterface } from "@/types/todoListInterface";
import { useParams } from "next/navigation";
import { addTodoItem } from "@/services/addTodoItem";

export default function AdTodoItem() {
  const todoLists = useTodoStore(state => state.todoLists);
  const { id } = useParams();
  const list: TodoListInterface = todoLists.find((todo) => todo.id === id);

  if (!list) {
    return <div className="text-xl p-10 text-red-500">Список не знайдений</div>;
  }


  return (
    <div className="text-3xl p-10 text-title text-center">
      <h1>{list.name}</h1>
      <button
        className="mt-5 p-2 bg-blue-500 text-white rounded"
        onClick={() => addTodoItem(id)}
      >
        Додати задачу
      </button>
    </div>
  );
}
