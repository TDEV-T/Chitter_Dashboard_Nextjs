"use client";
import NavLinks from "./nav-links";
import { useRouter } from "next/navigation";

export default function SideNav() {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.clear();
    router.push("/auth");
  };

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 dark:bg-gray-800">
      <div className="flex md:m-10">
        <div className="w-32 text-blue md:w-40">Chitter Dashboard</div>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md 0 md:block">
          <button
            onClick={handleSignOut}
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium dark:bg-gray-700 dark:hover:text-white dark:hover:bg-blue-700  hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <div className="hidden md:block">Sign Out</div>
          </button>
        </div>
      </div>
    </div>
  );
}
