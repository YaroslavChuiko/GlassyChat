import type { ChatColor, UserColor } from "@prisma/client";
import { type ColorTheme } from "~/types/ColorTheme";

export const GLOBAL_ROOM_NAME = "Main room";

export const ALL_CHAT_COLORS: ChatColor[] = [
  "CHAT_COLOR_1",
  "CHAT_COLOR_2",
  "CHAT_COLOR_3",
  "CHAT_COLOR_4",
  "CHAT_COLOR_5",
];

export const ALL_USER_COLORS: UserColor[] = [
  "USER_COLOR_1",
  "USER_COLOR_2",
  "USER_COLOR_3",
  "USER_COLOR_4",
  "USER_COLOR_5",
];

export const THEME_GRADIENTS: Record<ColorTheme, string> = {
  amaranthus: "bg-gradient-to-br from-[#6366f1] to-[#d946ef]",
  nemesia: "bg-gradient-to-br from-[#4ADE80] to-[#06B6D4]",
  sunset: "bg-gradient-to-br from-[#ef4444] to-[#f97316]",
  rosebud: "bg-gradient-to-br from-[#ec4899] to-[#f43f5e]",
  sunshine: "bg-gradient-to-br from-[#fde68a] to-[#facc15]",
  holly: "bg-gradient-to-br from-[#bfdbfe] to-[#a5f3fc]",
  snowflake: "bg-gradient-to-br from-[#818cf8] to-[#22d3ee]",
  hibiscus: "bg-gradient-to-br from-[#a855f7] to-[#581c87]",
  silver: "bg-gradient-to-br from-[#cbd5e1] to-[#64748b]",
  darkness: "bg-gradient-to-br from-[#0f172a] to-[#334155]",
} as const;

export const CHAT_AVATAR_COLORS: Record<ChatColor, string> = {
  CHAT_COLOR_1: `bg-red-9 text-reddark-12`,
  CHAT_COLOR_2: `bg-purple-9 text-purpledark-12`,
  CHAT_COLOR_3: `bg-cyan-9 text-cyandark-12`,
  CHAT_COLOR_4: `bg-green-9 text-greendark-12`,
  CHAT_COLOR_5: `bg-orange-9 text-orangedark-12`,
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
