import React, { type ComponentProps } from "react";
import Header from "./Header";
import { useAppStore } from "~/store/store";
import MessageList from "./MessageList";
import Footer from "./Footer";

export default function Chat({ className, ...props }: ComponentProps<"div">) {
  const { selectedChat } = useAppStore();

  return (
    <div
      className={`fixed left-full top-0 flex h-full w-screen flex-col overflow-hidden bg-[rgba(255,_255,_255,_0.8)] backdrop-blur transition dark:bg-[rgba(0,_0,_0,_0.8)] min-[600px]:left-[450px] min-[600px]:max-lg:bg-[rgba(255,_255,_255,_0.75)] min-[600px]:max-lg:dark:bg-[rgba(0,_0,_0,_0.75)] lg:static lg:h-auto lg:w-1/3 lg:rounded-3xl lg:shadow-[0px_4px_24px_-1px_rgba(0,_0,_0,_0.2)] xl:w-1/4 ${className}`}
      {...props}
    >
      {selectedChat && (
        <>
          <Header selectedChat={selectedChat} />
          <MessageList chatId={selectedChat.id} />
          <Footer chatId={selectedChat.id} />
        </>
      )}
    </div>
  );
}
