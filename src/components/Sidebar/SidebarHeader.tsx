import DropdownMainMenu from "./DropdownMainMenu";

export default function SidebarHeader() {
  return (
    <div className="mb-4 flex w-full">
      <DropdownMainMenu className="mr-3" />
      <input
        className="h-10 flex-1 rounded-lg bg-graya-3 dark:bg-graydarka-3"
        type="text"
        placeholder="Search"
      />
    </div>
  );
}
