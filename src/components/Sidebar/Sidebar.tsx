import React from "react";
import SidebarHeader from "./SidebarHeader";
import ChatList from "./ChatList";

export default function Sidebar() {
  return (
    <div className="w-1/4 rounded-3xl bg-[rgba(255,_255,_255,0.8)] px-5 py-6 shadow-xl backdrop-blur">
      <SidebarHeader />
      <ChatList />
    </div>
  );
}
