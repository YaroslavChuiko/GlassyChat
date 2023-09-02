import moment from "moment";
import { useEffect, useState } from "react";
import { usePusher } from "~/hooks/usePusher";
import { useAppStore } from "~/store/store";
import { type Chat } from "~/types/Chat";
import { type Message } from "~/types/Message";
import Avatar from "../Avatar";

// Message | undefined = Chat["lastMessage"]
type Props = {
  chatInfo: Chat;
};

export default function ChatListItem({ chatInfo }: Props) {
  const { id, name, color, lastMessage } = chatInfo;
  const pusher = usePusher();
  const [lastInfo, setLastInfo] = useState<Chat["lastMessage"]>(lastMessage);
  const { selectedChat, setSelectedChat } = useAppStore();

  useEffect(() => {
    if (!pusher) return;

    const channel = pusher.subscribe(`chat-${id}`);

    channel.bind("new-message", (data: Message) => {
      //!! this is not working because the lastMessage is not updated (mb because of the double subscribing and binding to the same event, here and MessageList.tsx)
      setLastInfo({ ...data });
    });

    return () => {
      channel.unbind_all();
      channel.disconnect();
    };
  }, [pusher, id]);

  // const sendMessage = api.room.sendMessage.useMutation();
  // const handleSendMessage = () => {
  //   sendMessage.mutate({ roomId: id, content: "new message" });
  // };

  const handleClick = () => {
    setSelectedChat(chatInfo);
  };

  return (
    <div
      className={`${
        selectedChat?.id === id
          ? "bg-graya-6 dark:bg-graydarka-6"
          : "bg-graya-3 dark:bg-graydarka-3"
      } flex w-full cursor-pointer items-center rounded-lg px-3 py-3 transition hover:bg-graya-4 active:scale-[0.99] dark:hover:bg-graydarka-4`}
      onClick={handleClick}
    >
      <Avatar name={name} color={color} size="lg" className="mr-3" />
      <div className="flex-1 overflow-hidden">
        <div className=" flex items-center justify-between">
          <div className="flex-1 truncate text-base font-semibold text-gray-12 transition-colors dark:text-graydark-12">
            {name}
          </div>
          <div className="text-xs text-gray-11 transition-colors dark:text-graydark-11">
            {lastInfo ? moment(lastInfo.createdAt).fromNow() : "..."}
          </div>
        </div>
        <div className="truncate text-sm text-gray-11 transition-colors dark:text-graydark-11">
          <span className="text-gray-12 dark:text-graydark-12">
            {lastInfo?.author.name}
          </span>
          : {lastInfo ? lastInfo.content : "..."}
        </div>
      </div>
    </div>
  );
}
