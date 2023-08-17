import { type UserColor, type RoomColor } from "@prisma/client";
import { ROOM_COLORS, USER_COLORS } from "~/const/const";

const getRandomColor = <T>(colors: T[]): T => {
  const color = colors[Math.floor(Math.random() * colors.length)]!;
  return color;
};

export const getRandomRoomColor = () => getRandomColor<RoomColor>(ROOM_COLORS);
export const getRandomUserColor = () => getRandomColor<UserColor>(USER_COLORS);
