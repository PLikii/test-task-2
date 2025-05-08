"use client";

import CreateLists from "./createLists";
import SignOut from "./signOut";
import TodoNav from "./todoNav";

export default function NavBar() {
  return (
    <div className="flex items-center justify-between p-4 text-title">
      <CreateLists />
      <TodoNav />
      <SignOut />
    </div>
  );
}
