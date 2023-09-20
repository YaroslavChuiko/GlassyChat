import { type UserColor, type ChatColor } from "@prisma/client";
import { ALL_CHAT_COLORS, ALL_USER_COLORS } from "~/const/const";

const getRandomColor = <T>(colors: T[]): T => {
  const color = colors[Math.floor(Math.random() * colors.length)]!;
  return color;
};

export const getRandomChatColor = () =>
  getRandomColor<ChatColor>(ALL_CHAT_COLORS);
export const getRandomUserColor = () =>
  getRandomColor<UserColor>(ALL_USER_COLORS);
