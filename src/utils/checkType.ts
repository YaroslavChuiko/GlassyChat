import type { ChatColor, UserColor } from "@prisma/client";
import { ALL_CHAT_COLORS, ALL_USER_COLORS } from "~/const/const";
import { ALL_COLOR_THEMES, type ColorTheme } from "~/types/ColorTheme";

export function isColorTheme(value: string): value is ColorTheme {
  return ALL_COLOR_THEMES.includes(value as ColorTheme);
}

export function isChatColor(value: string): value is ChatColor {
  return ALL_CHAT_COLORS.includes(value as ChatColor);
}

export function isUserColor(value: string): value is UserColor {
  return ALL_USER_COLORS.includes(value as UserColor);
}
