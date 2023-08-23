const ALL_COLOR_THEMES = ["blue", "green", "yellow"] as const;
type ColorThemeTuple = typeof ALL_COLOR_THEMES;

export type ColorTheme = ColorThemeTuple[number];

export function isColorTheme(value: string): value is ColorTheme {
  return ALL_COLOR_THEMES.includes(value as ColorTheme);
}
