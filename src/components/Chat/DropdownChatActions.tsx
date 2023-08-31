import type { RoomType, RoomUserRole } from "@prisma/client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  DotsVerticalIcon,
  ExitIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import IconButton from "../IconButton";

type Props = {
  userRole: RoomUserRole;
  chatType: RoomType;
  className?: string;
};

export default function DropdownChatActions({
  userRole,
  chatType,
  className,
}: Props) {
  // const preventClosingMenu = (e: Event) => {
  //   e.preventDefault();
  // };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <IconButton
          className={`${className} outline-none data-[state=open]:bg-graya-5 dark:data-[state=open]:bg-graydarka-5`}
          icon={<DotsVerticalIcon width={20} height={20} />}
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[200px] rounded-lg bg-[rgba(255,_255,_255,0.7)] p-1 text-sm font-medium text-gray-12 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] backdrop-blur will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade  data-[side=top]:animate-slideDownAndFade dark:bg-[rgba(0,_0,_0,0.7)] dark:text-graydark-12 dark:shadow-[0px_10px_38px_-10px_rgba(62,_63,_64,_0.35),_0px_10px_20px_-15px_rgba(62,_63,_64,_0.2)]"
          sideOffset={10}
          align="end"
        >
          {userRole === "ADMIN" && (
            <>
              <DropdownMenu.Item className="my-[2px] flex h-[30px] cursor-pointer select-none items-center rounded-[5px] p-1 leading-none  outline-none transition active:scale-[0.98] data-[disabled]:pointer-events-none data-[highlighted]:bg-graya-4 data-[disabled]:text-gray-11 dark:data-[highlighted]:bg-graydarka-4 dark:data-[disabled]:text-graydark-11">
                <Pencil1Icon height={20} width={20} className="ml-2 mr-5" />
                Edit
              </DropdownMenu.Item>

              {chatType !== "GLOBAL" && (
                <DropdownMenu.Item
                  className="my-[2px] flex h-[30px] cursor-pointer select-none items-center rounded-[5px] p-1 leading-none outline-none transition active:scale-[0.98] data-[disabled]:pointer-events-none data-[highlighted]:bg-graya-4 data-[disabled]:text-gray-11 dark:data-[highlighted]:bg-graydarka-4 dark:data-[disabled]:text-graydark-11"
                  // onSelect={() => void signOut()}
                >
                  <TrashIcon height={20} width={20} className="ml-2 mr-5" />
                  Delete Chat
                </DropdownMenu.Item>
              )}
            </>
          )}

          {userRole === "MEMBER" && (
            <>
              <DropdownMenu.Item
                className="my-[2px] flex h-[30px] cursor-pointer select-none items-center rounded-[5px] p-1 leading-none outline-none transition active:scale-[0.98] data-[disabled]:pointer-events-none data-[highlighted]:bg-graya-4 data-[disabled]:text-gray-11 dark:data-[highlighted]:bg-graydarka-4 dark:data-[disabled]:text-graydark-11"
                // onSelect={() => void signOut()}
              >
                <ExitIcon height={20} width={20} className="ml-2 mr-5" />
                Leave Chat
              </DropdownMenu.Item>
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
