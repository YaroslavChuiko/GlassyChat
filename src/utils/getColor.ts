import { type ChatColor, type UserColor } from "@prisma/client";
import { CHAT_AVATAR_COLORS, USER_AVATAR_COLORS } from "~/const/const";
import { isChatColor } from "./checkType";

export const getAvatarColor = (color: ChatColor | UserColor) => {
  return isChatColor(color)
    ? CHAT_AVATAR_COLORS[color]
    : USER_AVATAR_COLORS[color];
};
