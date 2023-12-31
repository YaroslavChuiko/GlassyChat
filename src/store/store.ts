import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createThemeSlice, type ThemeSlice } from "./slices/createThemeSlice";
import {
  createSelectedChatSlice,
  type SelectedChatSlice,
} from "./slices/createSelectedChatSlice";
import {
  type SidebarSlice,
  createSidebarSlice,
} from "./slices/createSidebarSlice";

type StoreState = ThemeSlice & SelectedChatSlice & SidebarSlice;

export const useAppStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createThemeSlice(...a),
      ...createSelectedChatSlice(...a),
      ...createSidebarSlice(...a),
    }),
    {
      name: "theme-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) =>
            ["colorTheme", "darkMode"].includes(key)
          )
        ),
    }
  )
);
