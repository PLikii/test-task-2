import { db } from "@/lib/firebase";
import type { TodoListInterface } from "@/types/todoListInterface";
import type { User } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const useTodoLists = (user: User | null) => {
  const [todoLists, setTodoLists] = useState<TodoListInterface[]>([]);
  const [loadingTodo, setLoadingTodo] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    const unsubscribe = onSnapshot(
      query(
        collection(db, "todoLists"),
        where("users", "array-contains", user.email),
      ),
      querySnapshot => {
        setLoadingTodo(true);
        try {
          const lists: TodoListInterface[] = [];
          for (let i = 0; i < querySnapshot.docs.length; i++) {
            const doc = querySnapshot.docs[i];
            lists.push({ id: doc.id, ...doc.data() } as TodoListInterface);
          }
          setTodoLists(lists);
        } catch (_error) {
          Swal.fire({
            icon: "error",
            title: "Error while retrieving lists",
            text: "Something went wrong!",
            confirmButtonText: "Ок",
          });
        } finally {
          setLoadingTodo(false);
        }
      },
    );

    return () => unsubscribe();
  }, [user]);

  return { todoLists, loadingTodo };
};
