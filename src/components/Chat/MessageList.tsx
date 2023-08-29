import React from "react";
import { api } from "~/utils/api";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import Message from "./Message";
import { useSession } from "next-auth/react";

type Props = {
  chatId: string;
};

export default function MessageList({ chatId }: Props) {
  const session = useSession();
  const { data, isLoading, isSuccess } = api.room.getMessages.useQuery({
    id: chatId,
  });

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  if (isSuccess && !data.length) {
    return <div>There are no messages yet!</div>;
  }

  return (
    <ScrollArea.Root className="flex-1 overflow-hidden rounded">
      <ScrollArea.Viewport className="h-full w-full rounded">
        <div className="mx-auto w-3/5">
          {data.map((message) => (
            <Message
              key={message.id}
              orientation={
                session.data?.user?.id === message.author.id ? "right" : "left"
              }
              {...message}
            ></Message>
          ))}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex touch-none select-none bg-graya-3 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-graya-4 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-graya-5 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}
