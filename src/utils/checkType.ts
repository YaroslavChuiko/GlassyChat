import type { RoomColor, UserColor } from "@prisma/client";
import { ALL_ROOM_COLORS, ALL_USER_COLORS } from "~/const/const";
import { ALL_COLOR_THEMES, type ColorTheme } from "~/types/ColorTheme";

export function isColorTheme(value: string): value is ColorTheme {
  return ALL_COLOR_THEMES.includes(value as ColorTheme);
}

export function isRoomColor(value: string): value is RoomColor {
  return ALL_ROOM_COLORS.includes(value as RoomColor);
}

export function isUserColor(value: string): value is UserColor {
  return ALL_USER_COLORS.includes(value as UserColor);
}
