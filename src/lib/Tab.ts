import { FiBookOpen } from "react-icons/fi";
import type { IconType } from "react-icons";

export type Tab = {
  id: string;
  label: string;
  pinned: boolean;
  href: string;
  icon: IconType;
};

export const defaultTabs: Tab[] = [
  {
    id: "0",
    label: "Dashboard",
    pinned: false,
    href: "Dashboard",
    icon: FiBookOpen,
  },
  {
    id: "1",
    label: "Banking",
    pinned: false,
    href: "Banking",
    icon: FiBookOpen,
  },
  {
    id: "2",
    label: "Telefonie",
    pinned: false,
    href: "Telefonie",
    icon: FiBookOpen,
  },
  {
    id: "3",
    label: "Accounting",
    pinned: false,
    href: "Accounting",
    icon: FiBookOpen,
  },
  {
    id: "4",
    label: "Verkauf",
    pinned: false,
    href: "Verkauf",
    icon: FiBookOpen,
  },
  {
    id: "5",
    label: "Statistik",
    pinned: false,
    href: "Statistik",
    icon: FiBookOpen,
  },
  {
    id: "6",
    label: "Post Office",
    pinned: false,
    href: "Post Office",
    icon: FiBookOpen,
  },
  {
    id: "7",
    label: "Administration",
    pinned: false,
    href: "Administration",
    icon: FiBookOpen,
  },
  { id: "8", label: "Help", pinned: false, href: "Help", icon: FiBookOpen },
  {
    id: "9",
    label: "Warenbestand",
    pinned: false,
    href: "Warenbestand",
    icon: FiBookOpen,
  },
  {
    id: "10",
    label: "Auswahllisten",
    pinned: false,
    href: "Auswahllisten",
    icon: FiBookOpen,
  },
  {
    id: "11",
    label: "Einkauf",
    pinned: false,
    href: "Einkauf",
    icon: FiBookOpen,
  },
  { id: "12", label: "Rechn", pinned: false, href: "Rechn", icon: FiBookOpen },
  {
    id: "13",
    label: "Lagerverwaltung",
    pinned: false,
    href: "Lagerverwaltung",
    icon: FiBookOpen,
  },
  {
    id: "14",
    label: "Verkauf",
    pinned: false,
    href: "Verkauf",
    icon: FiBookOpen,
  },
  {
    id: "15",
    label: "Post Office",
    pinned: false,
    href: "Post Office",
    icon: FiBookOpen,
  },
  {
    id: "16",
    label: "Telefonie",
    pinned: false,
    href: "Telefonie",
    icon: FiBookOpen,
  },
];
