import { type RoomColor, type UserColor } from "@prisma/client";
import * as AvatarRadix from "@radix-ui/react-avatar";
import { geAvatarColor } from "~/utils/getColor";

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
          className={`${geAvatarColor(
            color
          )} leading-1 flex h-full w-full items-center justify-center  font-medium`}
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
      return "h-[30px] w-[30px] text-[14px]";
    case "md":
      return "h-[40px] w-[40px] text-[18px]";
    case "lg":
      return "h-[50px] w-[50px] text-[20px]";
    default:
      return "h-[40px] w-[40px] text-[20px]";
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
