'use client'
import { UpdateTaskStatus } from "@/services/updateTodoItem";
import { useAuth } from "@/hooks/useAuth";
import { deleteTodoItem } from "@/services/deleteTodoItem";
import Swal from "sweetalert2";

interface TodoItemsProps {
    todoListId: string;
    id: string;
    title: string;
    description: string;
    completed: boolean;
    admin: string[];
}

export default function Todoitems({ todoListId, id, title, description, completed, admin }: TodoItemsProps) {
    const { user } = useAuth();
    const isAdmin = admin.includes(user?.email || "");

    const handleCheckboxChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedCompleted = event.target.checked;
        await UpdateTaskStatus(todoListId, id, updatedCompleted);
    };

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            await deleteTodoItem(todoListId, id);
            Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
        }
    };


    return (
        <div className="text-2xl p-10 text-title grid border-2 border-gray-500 rounded-2xl space-y-4">
            <div className=" flex justify-between  items-center">
                <div>{title}</div>
                <div className=" text-base flex space-x-3">
                    {isAdmin ? <><div>✏️</div>
                        <button type="button" onClick={handleDelete}>🗑️</button>
                    </> : ""
                    }

                </div>
            </div>
            <div className="text-lg">{description}</div>
            <div className="space-x-3 text-xl">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={handleCheckboxChange}
                />
                <label>Done</label>
            </div>
        </div>
    );
}
