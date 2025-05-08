import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { TodoListInterface } from "@/types/todoListInterface"; // Імпортуємо тип для TodoList

export const UpdateTaskStatus = async (
  todoListId: string, 
  taskId: string, 
  updatedCompleted: boolean
) => {
  try {
    // Отримуємо документ списку todo з Firestore
    const todoListRef = doc(db, "todoLists", todoListId);
    const todoListDoc = await getDoc(todoListRef);

    if (todoListDoc.exists()) {
      const todoListData = todoListDoc.data() as TodoListInterface;

      // Перевіряємо, чи існує todoList
      if (!todoListData || !Array.isArray(todoListData.todoList)) {
        throw new Error("Todo list or todoList array is not defined");
      }

      // Знаходимо і оновлюємо конкретну задачу в масиві
      const updatedTodoList = todoListData.todoList.map(todo => 
        todo.id === taskId ? { ...todo, completed: updatedCompleted } : todo
      );

      // Якщо задача не знайдена, виводимо помилку
      if (updatedTodoList.find(todo => todo.id === taskId) === undefined) {
        throw new Error(`Task with id ${taskId} not found in todoList`);
      }

      // Оновлюємо документ у Firestore
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
