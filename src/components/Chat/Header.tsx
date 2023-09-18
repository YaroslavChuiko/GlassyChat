import { type Chat } from "~/types/Chat";
import DropdownChatActions from "./DropdownChatActions";
import ChatInfo from "./ChatInfo";
import IconButton from "../IconButton";
import { ArrowLeftIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useAppStore } from "~/store/store";

type Props = {
  selectedChat: Chat;
};

export default function Header({ selectedChat }: Props) {
  const { setSelectedChat, isSidebarShowed, setIsSidebarShowed } =
    useAppStore();
  const { userRole, type } = selectedChat;

  const handleBack = () => {
    if (isSidebarShowed) {
      setSelectedChat(null);
      return;
    }

    setIsSidebarShowed(true);
  };

  return (
    <div className="flex h-16 w-full items-center justify-between bg-graya-3 px-[10px] py-[15px] transition-colors dark:bg-graydarka-3 sm:h-20 sm:px-[30px] sm:py-[15px]">
      <div className="flex items-center">
        <IconButton
          className={`mr-5 lg:hidden`}
          icon={
            isSidebarShowed ? (
              <Cross1Icon width={20} height={20} />
            ) : (
              <ArrowLeftIcon width={20} height={20} />
            )
          }
          onClick={handleBack}
        />
        <ChatInfo chat={selectedChat} />
      </div>
      <DropdownChatActions userRole={userRole} chatType={type} />
    </div>
  );
}
