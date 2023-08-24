import moment from "moment";
import { useEffect, useState } from "react";
import { usePusher } from "~/hooks/usePusher";
import { api, type RouterOutputs } from "~/utils/api";
import Avatar from "../Avatar";

type Room = RouterOutputs["user"]["getRooms"][number];
type Message = RouterOutputs["room"]["sendMessage"]; // Message | undefined = Room["lastMessage"]

export default function ChatListItem({ id, name, color, lastMessage }: Room) {
  const pusher = usePusher();
  const [lastInfo, setLastInfo] = useState<Room["lastMessage"]>(lastMessage);

  useEffect(() => {
    if (!pusher) return;

    const channel = pusher.subscribe(`room-${id}`);

    channel.bind("new-message", (data: Message) => {
      setLastInfo(data);
    });

    return () => {
      channel.disconnect();
    };
  }, [pusher, id]);

  const sendMessage = api.room.sendMessage.useMutation();
  const handleSendMessage = () => {
    sendMessage.mutate({ roomId: id, content: "new message" });
  };

  return (
    <div
      className="flex w-full cursor-pointer items-center rounded-lg bg-graya-3 bg-opacity-5 px-3 py-3 transition hover:bg-graya-4 active:scale-[0.99] dark:bg-graydarka-3 dark:hover:bg-graydarka-4"
      onClick={() => handleSendMessage()}
    >
      <Avatar name={name} color={color} size="lg" className="mr-3" />
      <div className="flex-1 overflow-hidden">
        <div className=" flex items-center justify-between">
          <div className="flex-1 truncate text-base font-semibold text-gray-12 dark:text-graydark-12">
            {name}
          </div>
          <div className="text-xs text-gray-11 dark:text-graydark-11">
            {lastInfo ? moment(lastInfo.createdAt).fromNow() : "..."}
          </div>
        </div>
        <div className="truncate text-sm text-gray-11 dark:text-graydark-11">
          <span className="text-gray-12 dark:text-graydark-12">
            {lastInfo?.author.name}
          </span>
          : {lastInfo ? lastInfo.content : "..."}
        </div>
      </div>
    </div>
  );
}
