import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { TodoListInterface } from "@/types/todoListInterface";

export const UpdateTaskStatus = async (
  todoListId: string, 
  taskId: string, 
  updatedCompleted: boolean
) => {
  try {
    const todoListRef = doc(db, "todoLists", todoListId);
    const todoListDoc = await getDoc(todoListRef);

    if (todoListDoc.exists()) {
      const todoListData = todoListDoc.data() as TodoListInterface;

      if (!todoListData || !Array.isArray(todoListData.todoList)) {
        throw new Error("Todo list or todoList array is not defined");
      }

      const updatedTodoList = todoListData.todoList.map(todo => 
        todo.id === taskId ? { ...todo, completed: updatedCompleted } : todo
      );

      if (updatedTodoList.find(todo => todo.id === taskId) === undefined) {
        throw new Error(`Task with id ${taskId} not found in todoList`);
      }

      await updateDoc(todoListRef, {
        todoList: updatedTodoList,
      });

      console.log("Task completion status updated.");
    } else {
      console.error("Todo list not found");
    }
  } catch (error) {
    console.error("Error updating task completion status:", error);
  }
};
