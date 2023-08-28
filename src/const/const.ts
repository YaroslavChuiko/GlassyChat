import { type UserColor, type RoomColor } from "@prisma/client";
import { type ColorTheme } from "~/types/ColorTheme";

export const GLOBAL_ROOM_NAME = "Main room";

export const ALL_ROOM_COLORS: RoomColor[] = [
  "ROOM_COLOR_1",
  "ROOM_COLOR_2",
  "ROOM_COLOR_3",
  "ROOM_COLOR_4",
  "ROOM_COLOR_5",
];

export const ALL_USER_COLORS: UserColor[] = [
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

export const ROOM_COLORS: Record<RoomColor, string> = {
  ROOM_COLOR_1: "red",
  ROOM_COLOR_2: "purple",
  ROOM_COLOR_3: "cyan",
  ROOM_COLOR_4: "green",
  ROOM_COLOR_5: "orange",
} as const;

export const USER_COLORS: Record<UserColor, string> = {
  USER_COLOR_1: "blue",
  USER_COLOR_2: "purple",
  USER_COLOR_3: "cyan",
  USER_COLOR_4: "green",
  USER_COLOR_5: "orange",
} as const;
