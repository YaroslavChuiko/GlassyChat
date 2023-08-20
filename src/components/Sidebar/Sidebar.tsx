import React from "react";
import SidebarHeader from "./SidebarHeader";
import ChatList from "./ChatList";

export default function Sidebar() {
  return (
    <div className="w-1/4 rounded-3xl bg-white bg-opacity-70 px-5 py-6 shadow-xl">
      <SidebarHeader />
      <ChatList />
    </div>
  );
}
