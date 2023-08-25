import React from "react";
import * as AvatarRadix from "@radix-ui/react-avatar";
import { type RoomColor, type UserColor } from "@prisma/client";

type Size = "sm" | "md" | "lg";
type Color = RoomColor | UserColor;

type Props = {
  imgSrc?: string;
  name: string;
  size: Size;
  color: Color;
  className?: string;
};

export default function Avatar({
  imgSrc = "",
  name,
  color,
  size = "md",
  className = "",
}: Props) {
  return (
    <div className={className}>
      <AvatarRadix.Root
        className={`${getSizeStyle(
          size
        )} bg-blackA3 inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle`}
      >
        <AvatarRadix.Image
          className="h-full w-full rounded-[inherit] object-cover"
          src={imgSrc}
          alt={name}
        />
        <AvatarRadix.Fallback
          className={`${getColorStyle(
            color
          )} leading-1 flex h-full w-full items-center justify-center text-[20px] font-medium`}
        >
          {getAcronym(name)}
        </AvatarRadix.Fallback>
      </AvatarRadix.Root>
    </div>
  );
}

const getSizeStyle = (size: Size) => {
  switch (size) {
    case "sm":
      return "h-[30px] w-[30px]";
    case "md":
      return "h-[40px] w-[40px]";
    case "lg":
      return "h-[50px] w-[50px]";
    default:
      return "h-[40px] w-[40px]";
  }
};

const getColorStyle = (color: Color) => {
  switch (color) {
    case "ROOM_COLOR_1":
    case "USER_COLOR_1":
      return "bg-red-9 text-reddark-12";
    case "ROOM_COLOR_2":
    case "USER_COLOR_2":
      return "bg-purple-9 text-purpledark-12";
    case "ROOM_COLOR_3":
    case "USER_COLOR_3":
      return "bg-cyan-9 text-cyandark-12";
    case "ROOM_COLOR_4":
    case "USER_COLOR_4":
      return "bg-green-9 text-greendark-12";
    case "ROOM_COLOR_5":
    case "USER_COLOR_5":
      return "bg-orange-9 text-orangedark-12";
    default:
      return "bg-purple-9 text-purpledark-12";
  }
};

const getAcronym = (name: string): string => {
  const acronym = name
    .split(" ")
    .map((word) => {
      return word[0] ? word[0].toUpperCase() : "";
    })
    .join("");

  if (acronym.length > 2) return acronym.slice(0, 2);

  return acronym;
};
