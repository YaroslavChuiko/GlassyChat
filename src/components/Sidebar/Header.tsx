import DropdownMainMenu from "./DropdownMainMenu";
import SearchInput from "./SearchInput";

export default function Header() {
  return (
    <div className="mb-4 flex w-full">
      <DropdownMainMenu className="mr-3" />
      <SearchInput />
    </div>
  );
}
