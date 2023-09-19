export const ALL_COLOR_THEMES = [
  "amaranthus",
  "nemesia",
  "sunset",
  "rosebud",
  "sunshine",
  "snowflake",
  "holly",
  "silver",
  "hibiscus",
  "darkness",
] as const;
type ColorThemeTuple = typeof ALL_COLOR_THEMES;

export type ColorTheme = ColorThemeTuple[number];
