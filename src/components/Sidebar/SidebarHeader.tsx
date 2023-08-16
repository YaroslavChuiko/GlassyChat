import { signOut } from "next-auth/react";

export default function SidebarHeader() {
  return (
    <div className="mb-4 flex w-full">
      <button
        className="mr-3 h-10 w-10 rounded-lg bg-black bg-opacity-5"
        onClick={() => void signOut()}
      >
        menu
      </button>
      <input
        className="h-10 w-full rounded-lg bg-black bg-opacity-5"
        type="text"
        placeholder="Search"
      />
    </div>
  );
}
