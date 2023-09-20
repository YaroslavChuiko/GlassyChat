import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import PusherProvider from "~/provider/PusherProvider";
import { useEffect, useState } from "react";
import { useAppStore } from "~/store/store";
import { THEME_GRADIENTS } from "~/const/const";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { applyDarkMode, colorTheme } = useAppStore();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // zustand persist is used - error: Text content does not match server-rendered HTML https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
  }, []);

  useEffect(() => {
    applyDarkMode();
  }, [applyDarkMode]);

  return (
    <SessionProvider session={session}>
      <PusherProvider>
        <main
          className={`${
            isClient && THEME_GRADIENTS[colorTheme]
          } flex max-h-screen min-h-screen min-w-full animate-gradient overflow-hidden bg-[length:400%_400%] font-sans lg:p-8`}
        >
          <Component {...pageProps} />
        </main>
      </PusherProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
