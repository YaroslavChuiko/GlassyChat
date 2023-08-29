import type { RoomColor, UserColor } from "@prisma/client";
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

export const ROOM_AVATAR_COLORS: Record<RoomColor, string> = {
  ROOM_COLOR_1: `bg-red-9 text-reddark-12`,
  ROOM_COLOR_2: `bg-purple-9 text-purpledark-12`,
  ROOM_COLOR_3: `bg-cyan-9 text-cyandark-12`,
  ROOM_COLOR_4: `bg-green-9 text-greendark-12`,
  ROOM_COLOR_5: `bg-orange-9 text-orangedark-12`,
} as const;

export const USER_AVATAR_COLORS: Record<UserColor, string> = {
  USER_COLOR_1: `bg-blue-9 text-bluedark-12`,
  USER_COLOR_2: `bg-purple-9 text-purpledark-12`,
  USER_COLOR_3: `bg-cyan-9 text-cyandark-12`,
  USER_COLOR_4: `bg-green-9 text-greendark-12`,
  USER_COLOR_5: `bg-orange-9 text-orangedark-12`,
} as const;

export const USER_NAME_COLORS: Record<UserColor, string> = {
  USER_COLOR_1: `text-blue-11`,
  USER_COLOR_2: `text-purple-11`,
  USER_COLOR_3: `text-cyan-11`,
  USER_COLOR_4: `text-green-11`,
  USER_COLOR_5: `text-orange-11`,
} as const;
