import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const editTodoItem = async (
  todoListId: string,
  todoItemId: string,
  updatedTitle: string,
  updatedDescription: string,
) => {
  const todoDocRef = doc(db, "todoLists", todoListId);
  const snapshot = await getDoc(todoDocRef);

  if (!snapshot.exists()) throw new Error("Todo list not found");

  const data = snapshot.data();
  const currentList = data.todoList || [];

  const updatedList = currentList.map((item: any) =>
    item.id === todoItemId
      ? { ...item, title: updatedTitle, description: updatedDescription }
      : item,
  );

  await updateDoc(todoDocRef, { todoList: updatedList });
};
