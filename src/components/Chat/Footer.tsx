import { PaperPlaneIcon } from "@radix-ui/react-icons";
import React from "react";
import IconButton from "../IconButton";

export default function Footer() {
  // const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //another way to auto resize the textarea https://medium.com/@oherterich/creating-a-textarea-with-dynamic-height-using-react-and-typescript-5ed2d78d9848

    e.target.style.height = "55px";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <div className="mx-auto my-5 flex w-3/5 items-end">
      <textarea
        className="mr-[15px] h-[55px] max-h-[200px] flex-1 resize-none rounded-[10px] bg-graya-3 p-[15px] text-gray-12 placeholder-gray-11 transition hover:bg-graya-4 dark:bg-graydarka-3 dark:text-graydark-12 dark:placeholder-graydark-11 dark:hover:bg-graydarka-4"
        name="message"
        id="message"
        placeholder="Send message..."
        onChange={handleChange}
      ></textarea>
      <IconButton
        className="h-[55px] w-[55px]"
        icon={<PaperPlaneIcon width={25} height={25} />}
      />
    </div>
  );
}
