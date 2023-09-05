import React, { type ComponentProps } from "react";

type Props = {
  size: "sm" | "md" | "lg" | "xl";
} & ComponentProps<"div">;

export default function Loader({ size, className }: Props) {
  const getSize = (size: Props["size"]) => {
    switch (size) {
      case "sm":
        return "scale-[1]";
      case "md":
        return "scale-[1.25]";
      case "lg":
        return "scale-[1.5]";
      case "xl":
        return "scale-[2]";
      default:
        return "scale-[1.25]";
    }
  };

  return (
    <div
      className={`flex h-full w-full flex-1 items-center justify-center p-2 ${className}`}
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="24px"
        height="30px"
        viewBox="0 0 24 30"
        // style="enable-background:new 0 0 50 50;"
        xmlSpace="preserve"
        className={`${getSize(
          size
        )}  fill-graya-11 transition-colors dark:fill-graydarka-11`}
      >
        <rect x="0" y="10" rx="2" width="4" height="10" opacity="0.2">
          <animate
            attributeName="opacity"
            attributeType="XML"
            values="0.2; 1; .2"
            begin="0s"
            dur="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="height"
            attributeType="XML"
            values="10; 20; 10"
            begin="0s"
            dur="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values="10; 5; 10"
            begin="0s"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="8" y="10" rx="2" width="4" height="10" opacity="0.2">
          <animate
            attributeName="opacity"
            attributeType="XML"
            values="0.2; 1; .2"
            begin="0.15s"
            dur="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="height"
            attributeType="XML"
            values="10; 20; 10"
            begin="0.15s"
            dur="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values="10; 5; 10"
            begin="0.15s"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="16" y="10" rx="2" width="4" height="10" opacity="0.2">
          <animate
            attributeName="opacity"
            attributeType="XML"
            values="0.2; 1; .2"
            begin="0.3s"
            dur="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="height"
            attributeType="XML"
            values="10; 20; 10"
            begin="0.3s"
            dur="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values="10; 5; 10"
            begin="0.3s"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
  );
}
