import moment from "moment";
import { useEffect, useState } from "react";
import { usePusher } from "~/hooks/usePusher";
import { api, type RouterOutputs } from "~/utils/api";

type Room = RouterOutputs["user"]["getRooms"][number];
type Message = RouterOutputs["room"]["sendMessage"]; // Message | undefined = Room["lastMessage"]

export default function ChatListItem({ id, name, lastMessage }: Room) {
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
      className="flex cursor-pointer items-center rounded-lg bg-black bg-opacity-5 px-3 py-3"
      onClick={() => handleSendMessage()}
    >
      <div className=" mr-3 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-purple-700 text-xl text-white">
        MR
      </div>
      <div className="flex-grow">
        <div className=" flex items-center justify-between">
          <div className="text-base font-black text-black">{name}</div>
          <div className="text-xs text-gray-500">
            {lastInfo ? moment(lastInfo.createdAt).fromNow() : "..."}
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {lastInfo ? lastInfo.content : "..."}
        </div>
      </div>
    </div>
  );
}
