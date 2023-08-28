import moment from "moment";
import { type RouterOutputs } from "~/utils/api";
import { getUserNameColor } from "~/utils/getColor";
import Avatar from "../Avatar";

type Message = RouterOutputs["room"]["getMessages"][number];

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
    <div className="flex w-fit items-end py-[5px]">
      <Avatar
        className="mr-[10px]"
        color={author.color}
        size="md"
        name={author.name ?? ""}
        imgSrc={author.image ?? ""}
      />
      <div className="flex-1 rounded-[10px] bg-graya-3 px-[10px] py-[6px]">
        <div
          className={`${getUserNameColor(author.color)} text-sm font-semibold`}
        >
          {author.name}
        </div>
        <div className="inline-flex content-between items-end text-base text-gray-12">
          {content}
          <span
            className="ml-3 text-xs text-gray-11"
            title={moment(createdAt).format("LLLL")}
          >
            {formatDate(createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
