// TodoGreed.tsx
'use client'
import { useTodoStore } from "@/store/store";
import { TodoListInterface } from "@/types/todoListInterface";
import { useParams } from "next/navigation";
import TodoItems from "./todoItem";

export default function TodoGrid() {
    const todoLists = useTodoStore(state => state.todoLists);
    const { id } = useParams();

    const listId = Array.isArray(id) ? id[0] : id;

    if (!listId) {
        return <div className="text-xl p-10 text-red-500">Todo not found</div>;
    }

    const list: TodoListInterface = todoLists.find((todo) => todo.id === listId);

    if (!list) {
        return <div className="text-xl p-10 text-red-500">Todo not found</div>;
    }

    return (
        <div className="text-2xl p-10 text-title grid grid-cols-2 gap-10">
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
