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
      className="flex cursor-pointer items-center rounded-lg bg-graya-3 bg-opacity-5 px-3 py-3 transition hover:bg-graya-4 hover:shadow-sm"
      onClick={() => handleSendMessage()}
    >
      <Avatar name={name} color={color} size="lg" className="mr-3" />
      <div className="flex-grow">
        <div className=" flex items-center justify-between">
          <div className="text-base font-black text-gray-12">{name}</div>
          <div className="text-xs text-gray-11">
            {lastInfo ? moment(lastInfo.createdAt).fromNow() : "..."}
          </div>
        </div>
        <div className="text-sm text-gray-11">
          <span className="text-gray-12">{lastInfo?.author.name}</span>:{" "}
          {lastInfo ? lastInfo.content : "..."}
        </div>
      </div>
    </div>
  );
}
