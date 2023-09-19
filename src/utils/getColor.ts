import type { RoomColor, UserColor } from "@prisma/client";
import { ROOM_AVATAR_COLORS, USER_AVATAR_COLORS } from "~/const/const";
import { isRoomColor } from "./checkType";

export const getAvatarColor = (color: RoomColor | UserColor) => {
  return isRoomColor(color)
    ? ROOM_AVATAR_COLORS[color]
    : USER_AVATAR_COLORS[color];
};
