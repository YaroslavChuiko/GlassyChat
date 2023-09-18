/* eslint-disable @typescript-eslint/no-misused-promises */
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import React from "react";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import IconButton from "../IconButton";

type Props = {
  chatId: string;
};

type FormValues = {
  message: string;
};

const defaultValues: FormValues = {
  message: "",
};

export default function Footer({ chatId }: Props) {
  const {
    handleSubmit,
    register,
    formState: { isDirty },
    reset,
    setValue,
    getValues,
  } = useForm<FormValues>({
    defaultValues,
  });

  const sendMessageMutation = api.room.sendMessage.useMutation();

  const onSubmit = (value: FormValues) => {
    const message = value.message.trim();

    if (!isDirty || sendMessageMutation.isLoading || !message) return;

    sendMessageMutation.mutate({ chatId, content: message });
    reset(defaultValues);
    //!! bug: need to reset textarea height
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    autoResizeTextarea(e.target);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (e.shiftKey) {
        setValue("message", getValues("message") + "\n");
      } else {
        handleSubmit(onSubmit)().catch(console.error);
      }
      autoResizeTextarea(e.currentTarget);
    }
  };

  const autoResizeTextarea = (target: EventTarget & HTMLTextAreaElement) => {
    target.style.height = "55px"; // textarea default height
    target.style.height = target.scrollHeight + "px";
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto my-5 flex w-full items-end px-3 sm:px-7 lg:px-10 xl:w-3/5 xl:px-0"
    >
      <textarea
        className="mr-[15px] h-[55px] max-h-[200px] flex-1 resize-none rounded-[10px] bg-graya-3 p-[15px] text-gray-12 placeholder-gray-11 transition hover:bg-graya-4 dark:bg-graydarka-3 dark:text-graydark-12 dark:placeholder-graydark-11 dark:hover:bg-graydarka-4"
        id="message"
        placeholder="Send message..."
        onInput={handleInput}
        onKeyDown={onKeyDown}
        {...register("message")}
      ></textarea>
      <IconButton
        className={`h-[55px] w-[55px] ${
          sendMessageMutation.isLoading && "animate-pulse"
        }`}
        icon={<PaperPlaneIcon width={25} height={25} />}
      />
    </form>
  );
}
