import Pusher from "pusher-js";
import { useEffect, useState, type ReactNode } from "react";
import { PusherContext } from "~/context/PusherContext";
import { env } from "~/env.mjs";

type Props = {
  children: ReactNode;
};

const PusherProvider = ({ children }: Props) => {
  const [pusher, setPusher] = useState<Pusher | null>(null);

  useEffect(() => {
    if (!pusher) {
      setPusher(
        new Pusher(env.NEXT_PUBLIC_PUSHER_APP_KEY, {
          cluster: env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
        })
      );

      Pusher.log = (msg) => {
        console.log(msg);
      };
    }

    return () => {
      pusher?.disconnect();
    };
  }, [pusher]);

  return (
    <PusherContext.Provider value={pusher}>{children}</PusherContext.Provider>
  );
};

export default PusherProvider;
