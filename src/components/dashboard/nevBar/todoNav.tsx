"use client";

import { useTodoStore } from "@/store/store";
import type { TodoListInterface } from "@/types/todoListInterface";
import { useEffect, useRef, useState } from "react";
import TodoNavItem from "./todoNavItem";

export default function TodoNav() {
  const todoLists = useTodoStore(state => state.todoLists);
  const [visibleLists, setVisibleLists] = useState<TodoListInterface[]>([]);
  const [overflowLists, setOverflowLists] = useState<TodoListInterface[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [buttonPosition, setButtonPosition] = useState<DOMRect | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        const containerWidth =
          containerRef.current.getBoundingClientRect().width;

        let totalWidth = 0;
        const visible: TodoListInterface[] = [];
        const overflow: TodoListInterface[] = [];

        for (let i = 0; i < todoLists.length; i++) {
          totalWidth += 160;
          if (totalWidth <= containerWidth) {
            visible.push(todoLists[i]);
          } else {
            overflow.push(todoLists[i]);
          }
        }

        setVisibleLists(visible);
        setOverflowLists(overflow);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [todoLists]);

  const toggleMenu = () => {
    setMenuVisible(prev => !prev);

    if (buttonRef.current) {
      setButtonPosition(buttonRef.current.getBoundingClientRect());
    }
  };

  return (
    <div
      className="flex min-w-96 flex-auto justify-between space-x-6 p-4 text-title"
      ref={containerRef}
    >
      {visibleLists.map(list => (
        <TodoNavItem key={list.id} list={list} />
      ))}

      {overflowLists.length > 0 ? (
        <div>
          <button
            type="button"
            ref={buttonRef}
            onClick={toggleMenu}
            className="min-w-20 rounded bg-blue-500 p-2 text-white"
          >
            all
          </button>
        </div>
      ) : (
        ""
      )}
      {menuVisible && buttonPosition && (
        <ul
          className="absolute z-50 mt-2 w-40 rounded-2xl border bg-white shadow-lg drop-shadow-xl"
          style={{
            top: buttonPosition.bottom + window.scrollY + 20,
            left: buttonPosition.left + window.scrollX - 75,
          }}
        >
          {overflowLists.map(list => (
            <TodoNavItem key={list.id} list={list} />
          ))}
        </ul>
      )}
    </div>
  );
}
