import React, { type ComponentProps } from "react";
import Header from "./Header";
import ChatList from "./ChatList";

export default function Sidebar({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={`flex w-1/4 flex-col overflow-hidden rounded-3xl bg-[rgba(255,_255,_255,_0.8)] px-5 py-6 shadow-[0px_4px_24px_-1px_rgba(0,_0,_0,_0.2)] backdrop-blur transition-colors dark:bg-[rgba(0,_0,_0,_0.8)] ${className}`}
      {...props}
    >
      <Header />
      <ChatList />
    </div>
  );
}
