import AdTodoItem from "@/components/dashboard/body/addTodoItem";
import TodoGrid from "@/components/dashboard/body/todoGrid";

export default function DashboardID() {

  return (
    <div className="text-3xl p-10 text-title  grid grid-cols-2">
      <TodoGrid />
      <AdTodoItem />

    </div>
  );
}
