import moment from "moment";
import { api, type RouterOutputs } from "~/utils/api";

type Room = RouterOutputs["user"]["getRooms"][number];

export default function ChatListItem({ id, name }: Room) {
  const lastMessage = api.room.getLastMessage.useQuery({ id });

  return (
    <div className="flex cursor-pointer items-center rounded-lg bg-black bg-opacity-5 px-3 py-3">
      <div className="mr-3 h-[50px] w-[50px] rounded-full bg-white">A</div>
      <div className="flex-grow">
        <div className="mb-1 flex items-center justify-between">
          <div className="text-base font-black text-black">{name}</div>
          <div className="text-xs text-gray-500">
            {lastMessage.data
              ? moment(lastMessage.data.createdAt).fromNow()
              : "..."}
          </div>
        </div>
        <div className="text-xs text-gray-500">
          {lastMessage.data ? lastMessage.data.content : "..."}
        </div>
      </div>
    </div>
  );
}
