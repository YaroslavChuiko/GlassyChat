import moment from "moment";
import { USER_NAME_COLORS } from "~/const/const";
import Avatar from "../Avatar";
import React from "react";
import { type Message } from "~/types/Message";

type Props = {
  orientation: "left" | "right";
} & Message;

const isOneDayBefore = (date: Date) => {
  return moment(date).isBefore(moment().subtract(1, "days"));
};

export default function Message({
  orientation,
  author,
  content,
  createdAt,
}: Props) {
  const formatDate = (date: Date) => {
    if (isOneDayBefore(date)) {
      return moment(date).format("L");
    }

    return moment(date).format("HH:mm");
  };

  return (
    <div
      className={`flex w-full ${
        orientation === "right" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex w-fit max-w-[75%] items-end py-[5px] ${
          orientation === "right" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <Avatar
          className={orientation === "right" ? "ml-[10px]" : "mr-[10px]"}
          color={author.color}
          size="md"
          name={author.name ?? ""}
          imgSrc={author.image ?? ""}
        />
        <div className="flex-1 rounded-[10px] bg-graya-3 px-[10px] py-[6px] dark:bg-graydarka-3">
          <div
            className={`${
              USER_NAME_COLORS[author.color]
            } flex items-end text-sm font-semibold ${
              orientation === "right"
                ? "flex-row-reverse text-right"
                : "flex-row text-left"
            }`}
          >
            {author.name}
            <span
              className={`${
                orientation === "right" ? "mr-3" : "ml-3"
              } text-xs text-gray-11 dark:text-graydark-11`}
              title={moment(createdAt).format("LLLL")}
            >
              {formatDate(createdAt)}
            </span>
          </div>
          <div
            className={`${
              orientation === "right" ? "justify-end" : "justify-start"
            } flex w-full text-base leading-tight text-gray-12 dark:text-graydark-12`}
          >
            {content.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
