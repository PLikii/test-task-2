"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import type { Tab } from "@/lib/Tab";
import { useState, memo, useEffect } from "react";

type SortableTabProps = {
  tab: Tab;
  onTogglePin: (id: string) => void;
  onRemove: (id: string) => void;
  disableDrag: boolean;
  itemRef?: React.Ref<HTMLDivElement>;
};

function SortableTab({
  tab,
  onTogglePin,
  onRemove,
  disableDrag,
  itemRef,
}: SortableTabProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: tab.id,
      disabled: disableDrag,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
  };

  const handleCloseMenu = () => setMenuVisible(false);
  const handleMouseLeaveMenu = () => setMenuVisible(false);

  const [currentPath, setCurrentPath] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  return (
    <div className="group min-w-40 whitespace-nowrap font-medium hover:text-title">
      <div
        ref={node => {
          setNodeRef(node);
          if (itemRef && typeof itemRef === "function") {
            itemRef(node);
          } else if (
            itemRef &&
            typeof itemRef === "object" &&
            itemRef !== null
          ) {
            (itemRef as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
          }
        }}
        style={style}
        className={`flex items-center justify-between space-x-2 p-5 px-2 py-2 text-black shadow hover:bg-primary ${
          tab.pinned ? " border-gray-700 border-t-2" : ""
        }  ${currentPath === tab.href ? " border-border border-t-2" : ""}`}
        onContextMenu={handleContextMenu}
      >
        <div className="flex flex-1 items-center gap-2">
          <Link href={tab.href}>
            <span className="select-none">{tab.label}</span>
          </Link>
        </div>
        {!tab.pinned && (
          <div
            {...attributes}
            {...listeners}
            className="invisible cursor-move duration-75 group-hover:visible"
            title="Перемістити"
          >
            ☰
          </div>
        )}
      </div>

      {menuVisible && (
        <div
          className="absolute rounded border bg-white shadow-md"
          style={{ top: menuPosition.y, left: menuPosition.x }}
          onMouseLeave={handleMouseLeaveMenu}
        >
          <button
            type="button"
            className="block w-full px-4 py-2 text-gray-700 text-sm hover:bg-gray-200"
            onClick={() => {
              onTogglePin(tab.id);
              handleCloseMenu();
            }}
          >
            {tab.pinned ? "Unpin" : "Pin"}
          </button>
          <button
            type="button"
            className="block w-full px-4 py-2 text-gray-700 text-sm hover:bg-gray-200"
            onClick={() => {
              onRemove(tab.id);
              handleCloseMenu();
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default memo(SortableTab, (prevProps, nextProps) => {
  return (
    prevProps.tab.id === nextProps.tab.id &&
    prevProps.tab.label === nextProps.tab.label &&
    prevProps.tab.href === nextProps.tab.href &&
    prevProps.tab.pinned === nextProps.tab.pinned &&
    prevProps.disableDrag === nextProps.disableDrag
  );
});
