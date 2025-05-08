"use client";

import type { TodoListInterface } from "@/types/todoListInterface";
import { useEffect, useState } from "react";

import { addAdminToList } from "@/services/addAdminToList";
import { addUserToList } from "@/services/addUserToList";
import { deleteTodoList } from "@/services/deleteTodoList";
import { editTodoListName } from "@/services/editTodoListName";
import Link from "next/link";

interface TodoNavItemProps {
  list: TodoListInterface;
}

const TodoNavItem: React.FC<TodoNavItemProps> = ({ list }) => {
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
  }>({ visible: false, x: 0, y: 0 });

  useEffect(() => {
    document.addEventListener("click", handleClose);
    return () => document.removeEventListener("click", handleClose);
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.pageX,
      y: e.pageY,
    });
  };

  const handleClose = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  return (
    <div className="relative min-w-32">
      <Link href={`/dashboard/${list.id}`}>
        <h3
          onContextMenu={handleContextMenu}
          className="cursor-pointer border-gray-500 border-input border-b-2 p-3 text-center duration-200 hover:scale-105 hover:border-border"
        >
          {list.name}
        </h3>
      </Link>
      {contextMenu.visible && (
        <ul
          className="absolute z-50 w-40 rounded border bg-white shadow"
          style={{ top: contextMenu.y, left: contextMenu.x, position: "fixed" }}
          onMouseLeave={handleClose}
        >
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <li
            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            onClick={() => addUserToList(list.id)}
          >
            ➕ Add
          </li>
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <li
            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            onClick={() => addAdminToList(list.id)}
          >
            ➕ admin
          </li>
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <li
            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            onClick={async () => {
              await editTodoListName(list.id, list.name);
              setContextMenu({ ...contextMenu, visible: false });
            }}
          >
            ✏️ Edit
          </li>
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <li
            className="cursor-pointer px-4 py-2 text-red-600 hover:bg-gray-100"
            onClick={() =>
              deleteTodoList(list.id, list.name, () =>
                setContextMenu({ ...contextMenu, visible: false }),
              )
            }
          >
            🗑️ Remove
          </li>
        </ul>
      )}
    </div>
  );
};

export default TodoNavItem;
