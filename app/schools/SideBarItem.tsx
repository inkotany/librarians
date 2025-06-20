"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function SidebarItem({ href, icon, label }) {
  const path = usePathname();
  const isActive = path === href;

  return (
    <Link
      href={href}
      className={`group flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-primary text-white dark:bg-primary dark:text-white"
          : "text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white dark:hover:bg-primary"
      }`}
    >
      <span
        className={`transition ${
          isActive
            ? "stroke-white"
            : "stroke-gray-600 dark:stroke-gray-300 group-hover:stroke-white"
        }`}
      >
        {icon}
      </span>
      <span
        className={`transition ${
          isActive
            ? "font-semibold text-white"
            : "text-gray-800 dark:text-gray-200 group-hover:text-white"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}
