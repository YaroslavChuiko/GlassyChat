import React, { type ComponentProps } from "react";
import Header from "./Header";
import { useAppStore } from "~/store/store";
import MessageList from "./MessageList";

export default function Chat({ className, ...props }: ComponentProps<"div">) {
  const { selectedChat } = useAppStore();

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-3xl bg-[rgba(255,_255,_255,_0.8)] shadow-[0px_4px_24px_-1px_rgba(0,_0,_0,_0.2)] backdrop-blur transition-colors dark:bg-[rgba(0,_0,_0,_0.8)] ${className}`}
      {...props}
    >
      {selectedChat && (
        <>
          <Header selectedChat={selectedChat} />
          <MessageList chatId={selectedChat.id} />
          <div className="mx-auto flex w-3/4">
            <div className="my-5 h-[50px] w-full bg-graya-3">
              Send message...
            </div>
          </div>
        </>
      )}
    </div>
  );
}
