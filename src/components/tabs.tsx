"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState, useRef } from "react";
import { defaultTabs, type Tab } from "@/lib/Tab";
import Navbar from "./navbar";
import SortableTab from "./tabsItem";

export default function Tabs() {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [visibleTabs, setVisibleTabs] = useState<Tab[]>([]);
  const [overflowTabs, setOverflowTabs] = useState<Tab[]>([]);
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        const containerWidth =
          containerRef.current.getBoundingClientRect().width;

        let totalWidth = 0;
        const visible: Tab[] = [];
        const overflow: Tab[] = [];

        for (let i = 0; i < tabs.length; i++) {
          totalWidth += 160;
          if (
            totalWidth + 50 <=
            (containerWidth % 2 === 0 ? containerWidth : containerWidth - 1)
          ) {
            visible.push(tabs[i]);
          } else {
            overflow.push(tabs[i]);
          }
        }

        setVisibleTabs(visible);
        setOverflowTabs(overflow);
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
  }, [tabs]);

  useEffect(() => {
    const saved = localStorage.getItem("tabs");
    if (saved) {
      setTabs(JSON.parse(saved));
    } else {
      setTabs(defaultTabs);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tabs", JSON.stringify(tabs));
  }, [tabs]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const pinnedTabs = tabs.filter(t => t.pinned);
    const movableTabs = tabs.filter(t => !t.pinned);

    const oldIndex = movableTabs.findIndex(t => t.id === active.id);
    const newIndex = movableTabs.findIndex(t => t.id === over.id);

    const newMovableTabs = arrayMove(movableTabs, oldIndex, newIndex);
    setTabs([...pinnedTabs, ...newMovableTabs]);
  };

  const togglePin = (id: string) => {
    setTabs(prev => {
      const updated = prev.map(tab =>
        tab.id === id ? { ...tab, pinned: !tab.pinned } : tab,
      );

      return [
        ...updated.filter(t => t.pinned),
        ...updated.filter(t => !t.pinned),
      ];
    });
  };

  const removeTab = (id: string) => {
    setTabs(prev => prev.filter(tab => tab.id !== id));
  };

  const movableTabIds = tabs.filter(t => !t.pinned).map(t => t.id);

  return (
    <>
      <div className="visible md:hidden">
        <Navbar />
      </div>
      <div className="hidden p-4 md:block">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="flex " ref={containerRef}>
            <SortableContext
              items={movableTabIds}
              strategy={horizontalListSortingStrategy}
            >
              {visibleTabs.map(tab => (
                <SortableTab
                  key={tab.id}
                  tab={tab}
                  onTogglePin={togglePin}
                  onRemove={removeTab}
                  disableDrag={tab.pinned}
                />
              ))}
            </SortableContext>
            {overflowTabs.length > 0 ? (
              <div className="relative ml-auto flex items-center ">
                <button
                  type="button"
                  className="rounded bg-gray-700 p-2 text-white"
                  onClick={() => setShowBurgerMenu(!showBurgerMenu)}
                >
                  🍔
                </button>

                {showBurgerMenu && (
                  <div className="absolute top-full right-0 z-50 mt-2 max-h-96 w-56 overflow-y-auto overflow-x-hidden rounded-md border bg-white p-2 shadow-lg">
                    {overflowTabs.length > 0 ? (
                      <ul className="flex flex-col gap-1">
                        <SortableContext
                          items={movableTabIds}
                          strategy={verticalListSortingStrategy}
                        >
                          {overflowTabs.map(tab => (
                            <li key={tab.id}>
                              <SortableTab
                                tab={tab}
                                onTogglePin={togglePin}
                                onRemove={removeTab}
                                disableDrag={tab.pinned}
                              />
                            </li>
                          ))}
                        </SortableContext>
                      </ul>
                    ) : (
                      <p className="px-2 py-1 text-gray-500 text-sm">
                        Немає прихованих вкладок
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </DndContext>
      </div>
    </>
  );
}
