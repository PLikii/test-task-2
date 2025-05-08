import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const EditTodoItem = async (
    todoListId: string,
    todoItemId: string,
    updatedTitle: string,
    updatedDescription: string
) => {
    try {
        const todoListRef = doc(db, "todoLists", todoListId);

        // Оновлення назви та опису задачі в списку
        await updateDoc(todoListRef, {
            todoList: {
                [todoItemId]: {
                    title: updatedTitle,
                    description: updatedDescription,
                }
            }
        });

        console.log("Task updated in the database successfully!");
    } catch (error) {
        console.error("Error updating task:", error);
    }
};
