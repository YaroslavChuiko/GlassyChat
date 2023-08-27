import { type Chat } from "~/types/Chat";
import DropdownChatActions from "./DropdownChatActions";
import ChatInfo from "./ChatInfo";

type Props = {
  selectedChat: Chat;
};

export default function Header({ selectedChat }: Props) {
  const { userRole, type } = selectedChat;

  return (
    <div className="flex h-20 w-full items-center justify-between bg-graya-3 px-[30px] py-[15px] transition-colors dark:bg-graydarka-3">
      <ChatInfo chat={selectedChat} />
      <DropdownChatActions userRole={userRole} chatType={type} />
    </div>
  );
}
