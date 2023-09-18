import { type StateCreator } from "zustand";
import { type Chat } from "~/types/Chat";

export type SelectedChatSlice = {
  selectedChat: Chat | null;
  setSelectedChat: (chat: Chat | null) => void;
};

export const createSelectedChatSlice: StateCreator<SelectedChatSlice> = (
  set
) => ({
  selectedChat: null,
  setSelectedChat: (chat) => set({ selectedChat: chat }),
});
