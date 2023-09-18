import moment from "moment";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { usePusher } from "~/hooks/usePusher";
import { type Message as TMessage } from "~/types/Message";
import { api } from "~/utils/api";
import Message from "./Message";
import Loader from "../Loader";

type Props = {
  chatId: string;
};

const messagesPerPage = 20;

export default function MessageList({ chatId }: Props) {
  const session = useSession();
  const pusher = usePusher();
  const [newMessages, setNewMessages] = useState<TMessage[]>([]);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const {
    data,
    isSuccess,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isRefetching,
  } = api.room.infiniteMessages.useInfiniteQuery(
    {
      chatId,
      limit: messagesPerPage,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      // initialCursor: 1, // <-- optional you can pass an initialCursor
      // refetchOnReconnect: false,
      // refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (!isRefetching) setNewMessages([]); // set newMessages to empty arr after refetching
  }, [isRefetching]);

  useEffect(() => {
    //!! mb delete and add scroll to bottom button
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [newMessages]);

  useEffect(() => {
    if (!pusher) return;

    const channel = pusher.subscribe(`chat-${chatId}`);

    channel.bind("new-message", (data: TMessage) => {
      setNewMessages((prev) => [...prev, data]);
    });

    return () => {
      channel.unbind_all();
      channel.disconnect();
    };
  }, [pusher, chatId]);

  const sortMessagesByDates = (a: TMessage, b: TMessage) => {
    if (moment(a.createdAt).isAfter(b.createdAt)) return -1;
    if (moment(a.createdAt).isBefore(b.createdAt)) return 1;
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

  if (isLoading || !data) {
    return <Loader size="lg" />;
  }

  if (isSuccess && !data.pages.length && !newMessages.length) {
    return <div className="flex-1">There are no messages yet!</div>;
  }

  return (
    <div
      id="scrollableDiv"
      className="flex flex-1 flex-col-reverse overflow-y-auto"
    >
      <InfiniteScroll
        className="mx-auto flex w-full flex-col-reverse overflow-hidden px-2 sm:px-7 xl:w-3/5 xl:px-0"
        dataLength={data.pages.length * messagesPerPage}
        next={fetchNextPage}
        inverse={true}
        hasMore={hasNextPage ?? true}
        loader={<Loader size="sm" className="p-4" />}
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
