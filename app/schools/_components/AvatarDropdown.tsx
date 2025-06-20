"use client";

import { DropdownMenu } from "radix-ui";
import { LogOut, Mail } from "lucide-react";

import { signOut, useSession } from "next-auth/react";
import UserAvatar from "./UserAvatar";
import { useRouter } from "next/navigation";

const AvatarDropdown = () => {
  const { data } = useSession();
  const router = useRouter();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow-md transition duration-200 hover:scale-105 focus:outline-none"
          aria-label="Avatar options"
        >
          <UserAvatar />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[300px] rounded-lg bg-white dark:bg-gray-800 p-3 shadow-lg border border-gray-200 dark:border-gray-700 mt-2 right-0"
          align="end"
          sideOffset={5}
        >
          <DropdownMenu.Item className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
            <Mail size={18} /> {data?.user?.email}
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            {/* <Link
              href={hrefurl}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-primary hover:text-white dark:hover:bg-primary"
            >
              <Settings size={18} />
              Settings
            </Link> */}
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-2 h-px bg-gray-200 dark:bg-gray-700" />
          <DropdownMenu.Item
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 dark:text-red-500 transition-colors hover:bg-red-500 cursor-pointer hover:text-white dark:hover:bg-red-600/30"
            onClick={() => {
              signOut({redirectTo: "/login"});
              router.push("/login");
            }}
          >
            <LogOut size={18} /> Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default AvatarDropdown;
