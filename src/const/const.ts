import { type UserColor, type RoomColor } from "@prisma/client";
import { type ColorTheme } from "~/types/ColorTheme";

export const GLOBAL_ROOM_NAME = "Main room";

export const ROOM_COLORS: RoomColor[] = [
  "ROOM_COLOR_1",
  "ROOM_COLOR_2",
  "ROOM_COLOR_3",
  "ROOM_COLOR_4",
  "ROOM_COLOR_5",
];

export const USER_COLORS: UserColor[] = [
  "USER_COLOR_1",
  "USER_COLOR_2",
  "USER_COLOR_3",
  "USER_COLOR_4",
  "USER_COLOR_5",
];

export const THEME_GRADIENTS: Record<ColorTheme, string> = {
  blue: "bg-gradient-to-br from-[#6366f1] to-[#d946ef]",
  green: "bg-gradient-to-br from-[#4ADE80] to-[#06B6D4]",
  yellow: "bg-gradient-to-br from-[#FCD34D] to-[#F97316]",
} as const;
