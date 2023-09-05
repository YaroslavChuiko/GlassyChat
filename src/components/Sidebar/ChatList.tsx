import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import ChatListItem from "./ChatListItem";
import Loader from "../Loader";

export default function ChatList() {
  const { data: sessionData } = useSession();

  //TODO: mb move this call to getServerSideProps and save in sate manager like Zustand
  const userRooms = api.user.getRooms.useQuery({
    id: sessionData?.user?.id ?? "",
  });

  if (userRooms.isLoading) {
    return <Loader size="md" />;
  }

  if (userRooms.isError) {
    return <div className="flex-1">Something went wrong...</div>;
  }

  return (
    <div className="flex-1">
      {userRooms.isSuccess &&
        userRooms.data.map((room) => {
          return <ChatListItem key={room.id} chatInfo={room} />;
        })}
    </div>
  );
}
