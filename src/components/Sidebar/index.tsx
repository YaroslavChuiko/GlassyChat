import React, { type ComponentProps } from "react";
import Header from "./Header";
import ChatList from "./ChatList";

export default function Sidebar({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={`fixed left-0 top-0 flex h-full w-full flex-col overflow-hidden bg-[rgba(255,_255,_255,_0.8)] px-5 py-6 backdrop-blur transition-colors dark:bg-[rgba(0,_0,_0,_0.8)] min-[600px]:w-[450px] lg:static lg:h-auto lg:w-1/3 lg:rounded-3xl lg:shadow-[0px_4px_24px_-1px_rgba(0,_0,_0,_0.2)] xl:w-1/4 ${className}`}
      {...props}
    >
      <Header />
      <ChatList />
    </div>
  );
}
