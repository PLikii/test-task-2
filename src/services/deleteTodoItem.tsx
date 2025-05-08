import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore"; // додано getDoc
import { db } from "@/lib/firebase";

export const deleteTodoItem = async (todoListId: string, todoItemId: string) => {
    try {
        const todoListRef = doc(db, "todoLists", todoListId);
        const todoListDoc = await getDoc(todoListRef);

        if (!todoListDoc.exists()) {
            console.error(`Todo list with ID ${todoListId} does not exist`);
            return;
        }
        const todoListData = todoListDoc.data();
        const updatedTodoList = todoListData.todoList.filter((item: any) => item.id !== todoItemId);


        await updateDoc(todoListRef, {
            todoList: updatedTodoList
        });
    } catch (error) {
        console.error("Error deleting task:", error);
    }
};
