"use client";
import { useAuth } from "@/hooks/useAuth";
import { deleteTodoItem } from "@/services/deleteTodoItem";
import { editTodoItem } from "@/services/editTodoItem";
import { UpdateTaskStatus } from "@/services/updateTodoItem";
import Swal from "sweetalert2";

interface TodoItemsProps {
  todoListId: string;
  id: string;
  title: string;
  description: string;
  completed: boolean;
  admin: string[];
}

export default function Todoitems({
  todoListId,
  id,
  title,
  description,
  completed,
  admin,
}: TodoItemsProps) {
  const { user } = useAuth();
  const isAdmin = admin.includes(user?.email || "");

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const updatedCompleted = event.target.checked;
    await UpdateTaskStatus(todoListId, id, updatedCompleted);
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await deleteTodoItem(todoListId, id);
      Swal.fire("Deleted!", "Your task has been deleted.", "success");
    }
  };

  const handleEdit = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Task",
      html:
        `<input id="swal-input-title" class="swal2-input" placeholder="Enter title">` +
        `<textarea id="swal-input-description" class="swal2-textarea" placeholder="Enter description"></textarea>`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: () => {
        const title = (
          document.getElementById("swal-input-title") as HTMLInputElement
        )?.value.trim();
        const description = (
          document.getElementById(
            "swal-input-description",
          ) as HTMLTextAreaElement
        )?.value.trim();

        if (!(title && description)) {
          Swal.showValidationMessage("Both title and description are required");
          return;
        }

        return { title, description };
      },
    });

    if (formValues) {
      const { title: updatedTitle, description: updatedDescription } =
        formValues;
      await editTodoItem(todoListId, id, updatedTitle, updatedDescription);
      Swal.fire("Updated!", "Your task has been updated.", "success");
    }
  };

  return (
    <div className="grid space-y-4 rounded-2xl border-2 border-gray-500 p-10 text-2xl text-title">
      <div className=" flex items-center justify-between">
        <div>{title}</div>
        <div className=" flex space-x-3 text-base">
          {isAdmin ? (
            <>
              <button type="button" onClick={handleEdit}>
                ✏️
              </button>
              <button type="button" onClick={handleDelete}>
                🗑️
              </button>
            </>
          ) : (
            ""
          )}
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
