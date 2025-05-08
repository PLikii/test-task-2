"use client";

import NavBar from "@/components/dashboard/nevBar/navBar";
import { useAuth } from "@/hooks/useAuth";
import { useTodoLists } from "@/hooks/useTodoLists";
import { useTodoStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { todoLists, loadingTodo } = useTodoLists(user);
  const setTodoLists = useTodoStore(state => state.setTodoLists);

  useEffect(() => {
    if (todoLists.length) {
      setTodoLists(todoLists);
    }
  }, [todoLists, setTodoLists]);

  useEffect(() => {
    if (!(loading || user)) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || loadingTodo || !user) {
    return <div className="p-6">Перевірка авторизації...</div>;
  }

  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
