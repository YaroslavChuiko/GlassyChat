import DropdownMainMenu from "./DropdownMainMenu";

export default function SidebarHeader() {
  return (
    <div className="mb-4 flex w-full">
      <DropdownMainMenu className="mr-3" />
      <input
        className="h-10 flex-1 rounded-lg bg-black bg-opacity-5"
        type="text"
        placeholder="Search"
      />
    </div>
  );
}
