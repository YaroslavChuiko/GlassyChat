import { type UserColor, type RoomColor } from "@prisma/client";
import { ALL_ROOM_COLORS, ALL_USER_COLORS } from "~/const/const";

const getRandomColor = <T>(colors: T[]): T => {
  const color = colors[Math.floor(Math.random() * colors.length)]!;
  return color;
};

export const getRandomRoomColor = () =>
  getRandomColor<RoomColor>(ALL_ROOM_COLORS);
export const getRandomUserColor = () =>
  getRandomColor<UserColor>(ALL_USER_COLORS);
