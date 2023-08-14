import { useSession } from "next-auth/react";
import React from "react";
import { api } from "~/utils/api";
import ChatListItem from "./ChatListItem";

export default function ChatList() {
  const { data: sessionData } = useSession();

  const userRooms = api.user.getRooms.useQuery({
    id: sessionData?.user?.id ?? "",
  });

  return (
    <div className="h-fit">
      {userRooms.isSuccess &&
        userRooms.data.map((room) => {
          return <ChatListItem key={room.id} {...room} />;
        })}
    </div>
  );
}
