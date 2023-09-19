import { type StateCreator } from "zustand";
import { type ColorTheme } from "~/types/ColorTheme";

export type ThemeSlice = {
  colorTheme: ColorTheme;
  darkMode: boolean;
  setColorTheme: (colorTheme: ColorTheme) => void;
  toggleDarkMode: (darkMode: boolean) => void;
  applyDarkMode: () => void;
};

export const createThemeSlice: StateCreator<ThemeSlice> = (set, get) => ({
  colorTheme: "amaranthus",
  darkMode: false,
  setColorTheme: (colorTheme) => set({ colorTheme: colorTheme }),
  toggleDarkMode: () => {
    const className = "dark"; //due to tailwindcss
    const root = window.document.documentElement;

    if (get().darkMode) {
      root.classList.remove(className);
    } else {
      root.classList.add(className);
    }

    set({ darkMode: !get().darkMode });
  },
  applyDarkMode: () => {
    // used to apply dark mode on page load (if it was enabled before and saved in local storage)
    const className = "dark"; //due to tailwindcss
    const root = window.document.documentElement;

    if (get().darkMode) {
      root.classList.add(className);
    } else {
      root.classList.remove(className);
    }
  },
});
