import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createThemeSlice, type ThemeSlice } from "./slices/createThemeSlice";

type StoreState = ThemeSlice;

export const useAppStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createThemeSlice(...a),
    }),
    {
      name: "theme-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
