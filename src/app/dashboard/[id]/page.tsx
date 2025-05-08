import AdTodoItem from "@/components/dashboard/body/addTodoItem";
import TodoGrid from "@/components/dashboard/body/todoGrid";

export default function DashboardID() {
  return (
    <div className="grid grid-cols-2 p-10 text-3xl text-title">
      <TodoGrid />
      <AdTodoItem />
    </div>
  );
}
