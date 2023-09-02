import moment from "moment";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { usePusher } from "~/hooks/usePusher";
import { type Message as TMessage } from "~/types/Message";
import { api } from "~/utils/api";
import Message from "./Message";

type Props = {
  chatId: string;
};

export default function MessageList({ chatId }: Props) {
  const session = useSession();
  const pusher = usePusher();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const [newMessages, setNewMessages] = useState<TMessage[]>([]);

  const {
    data,
    isSuccess,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = api.room.infiniteMessages.useInfiniteQuery(
    {
      chatId,
      limit: 20,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      // initialCursor: 1, // <-- optional you can pass an initialCursor
    }
  );

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView();
  // }, [isSuccess]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [newMessages]);

  useEffect(() => {
    if (!pusher) return;

    const channel = pusher.subscribe(`chat-${chatId}`);

    channel.bind("new-message", (data: TMessage) => {
      setNewMessages((prev) => [...prev, data]);
      // scrollToBottom();
    });

    return () => {
      channel.unbind_all();
      channel.disconnect();
    };
  }, [pusher, chatId]);

  if (isLoading || !data) {
    return <div className="flex-1">Loading...</div>;
  }

  // if (isSuccess && !data.length) {
  //   return <div className="flex-1">There are no messages yet!</div>;
  // }

  const sortMessagesByDates = (a: TMessage, b: TMessage) => {
    if (moment(a.createdAt).isAfter(b.createdAt)) return 1;
    if (moment(a.createdAt).isBefore(b.createdAt)) return -1;
    return 0;
  };

  const renderMessage = (message: TMessage) => {
    return (
      <Message
        key={message.id}
        orientation={
          session.data?.user?.id === message.author.id ? "right" : "left"
        }
        {...message}
      />
    );
  };

  return (
    <div
      id="scrollableDiv"
      className="flex flex-1 flex-col-reverse overflow-y-auto"
    >
      <InfiniteScroll
        className="mx-auto flex w-3/5 flex-col-reverse"
        dataLength={data.pages.length * 20}
        next={fetchNextPage}
        inverse={true} //
        hasMore={hasNextPage ?? true}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
        <div ref={messagesEndRef}></div>
        {[...newMessages].sort(sortMessagesByDates).map(renderMessage)}
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.messages.map(renderMessage)}
          </React.Fragment>
        ))}
      </InfiniteScroll>
    </div>
  );
}
