import type { RoomColor, UserColor } from "@prisma/client";
import { ROOM_COLORS, USER_COLORS } from "~/const/const";
import { isRoomColor } from "./checkType";

export const getUserNameColor = (color: UserColor) => {
  return `text-${USER_COLORS[color]}-11`;
};

export const geAvatarColor = (color: RoomColor | UserColor) => {
  return isRoomColor(color)
    ? `bg-${ROOM_COLORS[color]}-9 text-${ROOM_COLORS[color]}dark-12`
    : `bg-${USER_COLORS[color]}-9 text-${USER_COLORS[color]}dark-12`;
};
