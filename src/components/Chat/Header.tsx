import { type Chat } from "~/types/Chat";
import { api } from "~/utils/api";
import Avatar from "../Avatar";

type Props = {
  chat: Chat;
};

export default function Header({ chat }: Props) {
  const { id, name, color } = chat;

  const membersCount = api.room.getMembersCount.useQuery({ id });

  return (
    <div className="flex h-20 w-full items-center justify-between bg-graya-3 px-[30px] py-[15px] transition-colors dark:bg-graydarka-3">
      <div className="flex items-center">
        <Avatar name={name} color={color} size="lg" className="mr-3" />
        <div className="flex-1 overflow-hidden">
          <div className=" flex items-center justify-between">
            <div className="flex-1 truncate text-base font-semibold text-gray-12 transition-colors dark:text-graydark-12">
              {name}
            </div>
          </div>
          <div className="truncate text-sm text-gray-11 transition-colors dark:text-graydark-11">
            {membersCount.isSuccess
              ? `${membersCount.data?.count} ${
                  membersCount.data?.count > 1 ? "members" : "member"
                }`
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
}
