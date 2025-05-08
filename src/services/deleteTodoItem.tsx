import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore"; // додано getDoc

export const deleteTodoItem = async (
  todoListId: string,
  todoItemId: string,
) => {
  try {
    const todoListRef = doc(db, "todoLists", todoListId);
    const todoListDoc = await getDoc(todoListRef);

    if (!todoListDoc.exists()) {
      return;
    }
    const todoListData = todoListDoc.data();
    const updatedTodoList = todoListData.todoList.filter(
      (item: any) => item.id !== todoItemId,
    );

    await updateDoc(todoListRef, {
      todoList: updatedTodoList,
    });
  } catch (_error) {}
};
