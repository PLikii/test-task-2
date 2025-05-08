import { TodoItem } from "@/types/TodoItemTypes";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import Swal from "sweetalert2";
import { TodoListInterface } from "@/types/todoListInterface";
import { db } from "@/lib/firebase";

export const addTodoItem = async (todoListId: string) => {
  try {
    const todoListRef = doc(db, "todoLists", todoListId);
    const todoListDoc = await getDoc(todoListRef);

    if (todoListDoc.exists()) {
      const todoListData = todoListDoc.data() as TodoListInterface;

      const { value: formValues } = await Swal.fire({
        title: "Add a new task",
        html:
          `<input id="swal-input1" class="swal2-input" placeholder="Title" />` +
          `<textarea id="swal-input2" class="swal2-textarea" placeholder="Description"></textarea>`,
        focusConfirm: false,
        preConfirm: () => {
          return {
            title: (document.getElementById("swal-input1") as HTMLInputElement).value,
            description: (document.getElementById("swal-input2") as HTMLTextAreaElement).value
          };
        }
      });

      if (formValues) {
        const { title, description } = formValues;

        if (!title.trim() || !description.trim()) {
          Swal.fire('Title and description cannot be empty!', '', 'warning');
          return;
        }

        const existingTodo = todoListData.todoList.find((item: TodoItem) => item.title.toLowerCase() === title.toLowerCase());

        if (existingTodo) {
          Swal.fire('This task already exists!', '', 'warning');
          return;
        }

        const newTodoItem: TodoItem = {
          id: `${Date.now()}`, 
          title,
          description,
          completed: false
        };

        await updateDoc(todoListRef, {
          todoList: arrayUnion(newTodoItem)
        });

        Swal.fire('Task added!', '', 'success');
      }
    } else {
      Swal.fire('List not found', '', 'error');
    }
  } catch (error) {
    Swal.fire('Error adding task', '', 'error');
  }
};
