import { LogOut } from "lucide-react"
import { signOut } from "../auth"

export function LogoutButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium bg-red-400 text-white dark:text-white transition-colors hover:bg-red-50 cursor-pointer hover:text-white dark:hover:bg-red-600/30 outline-0 border-0 w-full "> <LogOut size={18} /> Sign Out</button>
    </form>
  )
}