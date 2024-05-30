import React from "react";
import Link from "next/link";
import { UserIcon, CalendarIcon, PillIcon, FileTextIcon } from "lucide-react";

const links = [
  {
    Icon: UserIcon,
    content: "Patients",
    href: "patients",
  },
  {
    Icon: CalendarIcon,
    content: "Appointments",
    href: "appointments",
  },

  {
    Icon: FileTextIcon,
    content: "Reports",
    href: "reports",
  },
];

const Nav = ({ dialog = false }) => {
  return (
    <nav
      className={`grid items-start ${!dialog && "px-4"} text-sm font-medium`}
    >
      {links.map((item) => {
        const { Icon, content, href } = item;
        return (
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href={`/dashboard/${href}`}
            key={content + href}
          >
            <Icon className="h-4 w-4" />
            {content}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
