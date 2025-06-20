import {
  LayoutDashboard,
  Book,
  RefreshCcw,
  Users,
  PlusCircle,
  GraduationCap,
} from "lucide-react";
import React from "react";
import SidebarItem from "./SideBarItem";
import { auth } from "@/app/auth";
import { getApiClient } from "./axios";

export default async function Sidebar() {
  const { user } = await auth();
  const api = await getApiClient();

  // Type assertion to include institutionId
  const institutionId = (user as typeof user & { institutionId?: string })
    ?.institutionId;
  const res = await api.get(`/institutions/${institutionId}`);
  const { name } = res.data;
  const shortName = getShortForm(name);

  return (
    <div className="w-64 max-md:hidden min-h-screen bg-white library-dark-bg shadow-lg p-5 flex flex-col overflow-auto">
      <h2 className="text-2xl font-semibold flex flex-col items-baseline gap-1 text-gray-800 dark:text-white mb-6">
        {shortName}{" "}
        <span className="dark:text-white text-black font-light text-sm">
          {name}
        </span>
      </h2>
      <nav className="space-y-4">
        <SidebarItem
          href="/g/schools/dashboard"
          icon={<LayoutDashboard className="stroke-1" size={20} />}
          label="Dashboard"
        />
        <SidebarItem
          href="/g/schools/books"
          icon={<Book className="stroke-1" size={20} />}
          label="Books"
        />
        <SidebarItem
          href="/g/schools/circulations"
          icon={<RefreshCcw className="stroke-1" size={20} />}
          label="Circulations"
        />
        <SidebarItem
          href="/g/schools/students"
          icon={<GraduationCap className="stroke-1" size={20} />} // Changed to GraduationCap icon
          label="Students"
        />
        <SidebarItem
          href="/g/schools/members"
          icon={<Users className="stroke-1" size={20} />}
          label="Members"
        />
        <SidebarItem
          href="/g/schools/acquisitions"
          icon={<PlusCircle className="stroke-1" size={20} />}
          label="Acquisitions"
        />
        {/* <SidebarItem
          href="/g/schools/inter-library"
          icon={<Library className="stroke-1" size={20} />}
          label="Inter Library"
        />
        <SidebarItem
          href="/g/schools/reservations"
          icon={<Bookmark className="stroke-1" size={20} />}
          label="Reservations"
        />
        <SidebarItem
          href="/g/schools/reports"
          icon={<BarChart3 className="stroke-1" size={20} />}
          label="Reports"
        /> */}
      </nav>
    </div>
  );
}

function getShortForm(name: string): string {
  if (!name) return "";

  return name
    .split(" ") // Split into words
    .filter(Boolean) // Remove empty strings
    .map((word) => word.slice(0, 1)) // Take first 2 characters of each word
    .join("")
    .toUpperCase(); // Optional: Make it uppercase
}
