import { type StateCreator } from "zustand";

export type SidebarSlice = {
  isSidebarShowed: boolean; //!! used to show/hide sidebar on mobile
  setIsSidebarShowed: (val: boolean) => void;
  toggleIsSidebarShowed: () => void;
};

export const createSidebarSlice: StateCreator<SidebarSlice> = (set, get) => ({
  isSidebarShowed: true,
  setIsSidebarShowed: (val) => set({ isSidebarShowed: val }),
  toggleIsSidebarShowed: () => set({ isSidebarShowed: !get().isSidebarShowed }),
});
