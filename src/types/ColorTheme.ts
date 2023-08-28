export const ALL_COLOR_THEMES = ["blue", "green", "yellow"] as const;
type ColorThemeTuple = typeof ALL_COLOR_THEMES;

export type ColorTheme = ColorThemeTuple[number];
